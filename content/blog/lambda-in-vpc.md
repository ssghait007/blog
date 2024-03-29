---
title: Lambda Function In A VPC The Right Way.
description: Discover the right way to use AWS Lambda function in a VPC. This post covers the reasons why a Lambda function loses internet access in a VPC, and explains how to route traffic through a NAT to allow access to the internet.
category: Cloud
published: true
createdAt: 2021-08-14T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/lambda-vpc.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 5 min read
tags: ['cloud', 'aws']
proficiency: intermediate
# beginner intermediate advanced 
---

# Lambda Function In A VPC The Right Way.

In this post I have added my experience of working with lambda function in a VPC.

## When you associate lambda function to a VPC, it loses internet access.

When I was debugging the aws lambda functions locally it was running properly and was able to make API calls to outside resources.

I was using AWS SAM cli to debug lambda function, which spins up a docker image and runs lambda function inside it.

But when I deployed lambda function to aws and associated it with a VPC, It was not able to call outside internet. All the calls to outside APIs were timed out. Then I researched a bit about this and found out its because how lambda functions work.

## Why lambda functions loses internet access in VPC ?

Lambda function can not access internet when attached to a public subnet of your VPC, because Lambda functions do not have public IP addresses. You cannot send traffic to the internet, which happens via the VPC's Internet Gateway, unless you have a public IP.

## Allow lambda to get access to internet within VPC.

The way to access the internet is to route traffic through a NAT.
NAT gateway has an elastic network interface (i.e. an IP address).
So NAT gateway can forward traffic to internet gateway and allow access to outside internet.

Steps to be followed are,

1. You need to create two subnets in your VPC (one public and one private).

2. Create a NAT gateway in public subnet

3. Create a lambda function and attach private subnet.

4. Update route table config of private subnet to route all unknown traffic to NAT gateway.

Now your lambda function can access outside internet.

Below diagram shows this setup. Lambda function can access SNS APIs, as traffic is routed through NAT and then internet gateway.

![Example diagram](https://raw.githubusercontent.com/ssghait007/blog/main/assets/lambda-in-VPC.webp)

Read more about the solution [in this aws article](https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/)

## Keep in mind.

- NAT gateway is not serverless solution and charges per hour and per GB processed. So keep data transfer of NAT gateway low.

- Don't create NAT if lambda function only need to get access to internal VPC resources.

- Lambda function can't be invoked from outside VPC, Invocations can come via AWS Lambda API, or API gateway or other internal aws triggers

## References

- https://aws.amazon.com/premiumsupport/knowledge-center/internet-access-lambda-function/
