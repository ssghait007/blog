---
title: Use Notion as CMS for your website
description: The post describes how to integrate notion database with your website.
category: Frontend
published: true
createdAt: 2022-07-03T07:00:13.392Z
image: https://raw.githubusercontent.com/ssghait007/blog/main/assets/notion-as-cms-header.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 10 min read
tags: ['frontend']
proficiency: intermediate
# beginner intermediate advanced 
---

# Use Notion as CMS for your website

Notion is a note-taking software that I recently started using. It is very flexible and easy to use.

It can be a used as a writing repository, task management tool, a workout calendar, a database, and so much more. I manage my long term, short term goals, blog ideas scratch pad within notion.

Notion provides APIs which are good mix of REST and GraphQL. We will use these APIs, to fetch the pages and databases from notion. Because of this we can use notion as a CMS for any website.

Data fetched from the APIs will be added at built time to our demo website.

## Create a simple website

To showcase a simple use case.
Let's consider there is a hiring manager at small startup, And he/she manages the list of candidates in notion boards.
Board has sections ex. shortlisted, in process, hired candidates. Hiring manager moves the card of each candidate within respective section.

Names of the selected members should appear in team section on company website. I have created a one page website for this.

**Reference:**

https://tailwindcomponents.com/component/team-section-2

## Load data from a json file

I modified this example to use data from a json file.
Metadata of each team member like name, profilePic, jobtitle is loaded and shown on website.

```js{1,3-5}
import team from '../cms/team.json'
export default {
  name: 'IndexPage',
  data: () => ({
    team: team
  })
}
```

## Setup CICD using netlify

Netlify provides easy CICD integration with github.
Integrate netlify with your repo and Specify your build command and build output directory.

Follow the below given video to setup CICD for your github repo.

**Referance**

https://www.youtube.com/watch?v=4h8B080Mv4U

## Create a board in Notion

- Create a board in notion.

- Add few entries to it with relevant data, for this use case I have added name, jobTitle, profilePic, rank etc.

- Keep entries in each category. (Later we can move these items to done, that would publish them on website)

- Note down the database ID of this board. This will be used in API to query data.

`https://www.notion.so/{DB_ID}?v={VIEW_ID}`

![notion board](https://raw.githubusercontent.com/ssghait007/blog/main/assets/team_before.webp)

> Names from the Done column should appear on website

## Setup notion integration

- Create new integration in notion

This would give you a API key to use within your queries.

Make sure not to commit this to github (or any other SCM).

![notion integration](https://raw.githubusercontent.com/ssghait007/blog/main/assets/notion_integration.webp)

> Navigate to Notion developer --> my-integrations

## Share page with notion integration

- By using share page button, share you board with notion integration you created in last step.

![share page](https://raw.githubusercontent.com/ssghait007/blog/main/assets/share_notion_page.webp)

> This makes your content available to the integration, can be accessed using API now.

## Script to fetch notion data at build time

- Add `NOTION_API_KEY` and `NOTION_DB_ID` in env variables.

![netlify_env](https://raw.githubusercontent.com/ssghait007/blog/main/assets/netlify_env.webp)

> Navigate to your site --> build and deploy --> environment

Below script fetches data from notion and writes to a json file.

```js{1,3-5}
var axios = require('axios')
var fs = require('fs')
/* Filter entries with status `Done`, i.e.
fetch only team members who are onboarded in company.
Other statuses can be for candidates
who are in process of being hired or shortlisted
*/
var data = JSON.stringify({
  sorts: [
    {
      property: 'Status',
      direction: 'ascending'
    }
  ],
  filter: {
    property: 'Status',
    rich_text: {
      equals: 'Done'
    }
  }
})
const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DB_ID = process.env.NOTION_DB_ID
var config = {
  method: 'post',
  url: `https://api.notion.com/v1/databases/${NOTION_DB_ID}/query`,
  headers: {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    'Notion-Version': '2022-02-22',
    'Content-Type': 'application/json'
  },
  data: data
}
/* Make API call to fetch data, write to a json file.
This is the file that contains data of team
members shown on the website.*/
axios(config)
  .then(function(response) {
    let team = response.data.results.map(f => ({
      name: f.properties.Name.title[0].text.content,
      jobTitle: f.properties.jobTitle.rich_text[0].text.content,
      profilePic: f.properties.profilePic.rich_text[0].text.content,
      rank: f.properties.rank.rich_text[0].text.content
    }))
    team.sort((a, b) => a.rank - b.rank)
    fs.writeFileSync('./cms/team.json', JSON.stringify(team, null, 2), 'utf-8')
    console.log('Team data populated')
  })
  .catch(function(error) {
    console.log(error)
  })
```

## Change data in CMS and trigger build to see new data added to website

1. This is how the website looks initially.

![website before](https://raw.githubusercontent.com/ssghait007/blog/main/assets/site_before.webp)

2. Suppose Hiring manager finalise to **hire two new developers** and that should show on your website. Move their entries to the `Done` column in notion.

![team_after](https://raw.githubusercontent.com/ssghait007/blog/main/assets/team_after.webp)

3. Now **trigger a new build** in netlify to deploy these changes (with `clear cache and deploy site` option).

![trigger deploy](https://raw.githubusercontent.com/ssghait007/blog/main/assets/netlify_deploy.webp)

4. After deploy the **new members** will show on the website

![website after](https://raw.githubusercontent.com/ssghait007/blog/main/assets/site_after.webp)

> Website has been deployed with new data fetched at build time.

Full code for this can be found on [github](https://github.com/ssghait007/notion-as-cms)

# Note

This demo shows example to inject data at runtime, As this data is changed less frequently.

For use cases like product page, data will be changed rapidly .

You can use notion npm library to fetch this data while page loads in browser.

https://www.npmjs.com/package/@notionhq/client
