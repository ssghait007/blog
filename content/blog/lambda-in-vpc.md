---
title: Lambda Function In A VPC The Right Way.
description: 'Why an AWS Lambda function loses internet access inside a VPC, and how to fix it by routing traffic through a NAT gateway in a public subnet.'
category: Cloud
published: true
createdAt: 2021-08-14T07:00:13.392Z
updatedAt: 2026-09-29T00:00:00.000Z
image: /assets/lambda-vpc.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['aws', 'aws-lambda', 'vpc', 'nat-gateway']
proficiency: intermediate
# beginner intermediate advanced 
---

> **TL;DR:** When you associate an AWS Lambda function with a VPC, it silently loses internet access -- all external API calls will time out. This happens because Lambda functions don't get public IPs, so they can't route through the Internet Gateway. The fix: place your Lambda in a private subnet and route its traffic through a NAT Gateway (which does have a public IP via an Elastic Network Interface). This post covers the problem, the networking explanation, and step-by-step setup with public/private subnets and route tables.

In this post I have added my experience of working with lambda function in a VPC.

## Why does my Lambda function time out after I attach it to a VPC?

When I was debugging the aws lambda functions locally it was running properly and was able to make API calls to outside resources.

I was using AWS SAM cli to debug lambda function, which spins up a docker image and runs lambda function inside it.

But when I deployed lambda function to aws and associated it with a VPC, It was not able to call outside internet. All the calls to outside APIs were timed out. Then I researched a bit about this and found out its because how lambda functions work.

## Why do Lambda functions lose internet access in a VPC?

Lambda function can not access internet when attached to a public subnet of your VPC, because Lambda functions do not have public IP addresses. You cannot send traffic to the internet, which happens via the VPC's Internet Gateway, unless you have a public IP.

## How do I give a VPC Lambda function internet access?

The way to access the internet is to route traffic through a NAT.
NAT gateway has an elastic network interface (i.e. an IP address).
So NAT gateway can forward traffic to internet gateway and allow access to outside internet.

Steps to be followed are,

1. You need to create two subnets in your VPC (one public and one private).

2. Create a NAT gateway in public subnet

3. Create a lambda function and attach private subnet.

4. Update route table config of private subnet to route all unknown traffic to NAT gateway.

The private subnet's route table should have a default route like this:

| Destination | Target |
|---|---|
| `10.0.0.0/16` (your VPC CIDR) | `local` |
| `0.0.0.0/0` | `nat-xxxxxxxx` (your NAT gateway) |


Now your lambda function can access outside internet.

Below diagram shows this setup. Lambda function can access SNS APIs, as traffic is routed through NAT and then internet gateway.

![Diagram of a Lambda function in a private subnet routing internet traffic through a NAT gateway](/assets/lambda-in-VPC.webp)

Read more about the solution [in this aws article](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/)

## Keep in mind.

- NAT gateway is not serverless solution and charges per hour and per GB processed. For example, in us-east-1 it costs $0.045 per hour, which is about $33 a month before any data charges. Check the [VPC pricing page](https://aws.amazon.com/vpc/pricing/) for your region.

- Don't create NAT if lambda function only need to get access to internal VPC resources.

- Lambda function can't be invoked from outside VPC, Invocations can come via AWS Lambda API, or API gateway or other internal aws triggers

## How much does a NAT gateway cost compared with VPC endpoints?

These figures are my own calculation from AWS list prices in US East (N. Virginia), checked on 2026-09-29 against the [Amazon VPC pricing](https://aws.amazon.com/vpc/pricing/) and [AWS PrivateLink pricing](https://aws.amazon.com/privatelink/pricing/) pages. They are not a benchmark. Prices vary by region, so recheck before you decide.

Rates used: NAT gateway $0.045 per hour plus $0.045 per GB processed. Interface endpoint $0.01 per hour per Availability Zone plus $0.01 per GB. Gateway endpoints for S3 and DynamoDB have no charge. A month is 730 hours.

| Setup (per month) | Fixed cost | 100 GB processed | 1,000 GB processed |
|---|---|---|---|
| 1 NAT gateway (1 AZ) | $32.85 | $37.35 | $77.85 |
| 1 interface endpoint (1 AZ) | $7.30 | $8.30 | $17.30 |
| 1 interface endpoint (2 AZs) | $14.60 | $15.60 | $24.60 |
| S3 or DynamoDB gateway endpoint | $0 | $0 | $0 |

The takeaway: if your Lambda only talks to AWS services such as SNS, SQS or Secrets Manager, interface endpoints are usually cheaper than a NAT gateway, and S3 or DynamoDB gateway endpoints cost nothing. Keep the NAT gateway only if the function must call the public internet, such as third-party APIs.

## Frequently Asked Questions

### Can I put the Lambda function in a public subnet instead?

No. Lambda functions don't get public IP addresses, so an internet gateway alone can't route their traffic. They need a NAT gateway in a public subnet.

### How can Lambda reach AWS services without a NAT gateway?

Use VPC endpoints. Gateway endpoints for S3 and DynamoDB have no extra charge. Interface endpoints cover most other AWS services.

### Why did my function work locally with AWS SAM?

`sam local` runs the function in Docker on your own machine, so it uses your machine's network. The VPC rules only apply once the function runs in AWS.

## References

- [AWS Knowledge Center: Give internet access to a Lambda function in a VPC](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/)
- [AWS Lambda: Enable internet access for VPC-connected functions](https://docs.aws.amazon.com/lambda/latest/operatorguide/networking-vpc.html)
- [Amazon VPC pricing (NAT gateway)](https://aws.amazon.com/vpc/pricing/)
- [AWS: Gateway endpoints for S3 and DynamoDB](https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html)
