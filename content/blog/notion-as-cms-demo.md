---
title: Use Notion as CMS for your website
description: The post describes the step-by-step process of creating a simple website and loading data from a json file. Also, learn how to set up CICD using netlify, create a board in Notion, integrate it with your website, and fetch data from Notion at build time
category: Frontend
published: true
createdAt: 2022-07-03T07:00:13.392Z
updatedAt: 2026-09-28T00:00:00.000Z
image: /assets/notion-as-cms-header.webp
author: Sachin Ghait
authorTitle: Lead Developer
readingTime: 10 min read
tags: ['notion', 'headless-cms', 'netlify', 'javascript']
proficiency: intermediate
# beginner intermediate advanced 
---

> **TL;DR:** Notion can serve as a free headless CMS for any website. This post demonstrates the concept by building a team page for a startup where a hiring manager updates candidate statuses in a Notion board, and the website automatically reflects those changes. It covers creating a simple HTML site, integrating the Notion API to fetch database content at build time, and setting up Netlify CI/CD with build hooks to trigger redeployments when content changes.

# Use Notion as CMS for your website

Notion is a note-taking software that I recently started using. It is very flexible and easy to use.

It can be a used as a writing repository, task management tool, a workout calendar, a database, and so much more. I manage my long term, short term goals, blog ideas scratch pad within notion.

Notion provides APIs which are good mix of REST and GraphQL. We will use these APIs, to fetch the pages and databases from notion. Because of this we can use notion as a CMS for any website.

Data fetched from the APIs will be added at built time to our demo website.

The Notion API docs describe the database query endpoint used in this post. Each query returns at most 100 results per page, so larger boards need pagination with `start_cursor` ([Notion API reference](https://developers.notion.com/reference/post-database-query)).


## What are we building?

To showcase a simple use case.
Let's consider there is a hiring manager at small startup, And he/she manages the list of candidates in notion boards.
Board has sections ex. shortlisted, in process, hired candidates. Hiring manager moves the card of each candidate within respective section.

Names of the selected members should appear in team section on company website. I have created a one page website for this.

**Reference:** [Tailwind team section component](https://tailwindcomponents.com/component/team-section-2)

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

## How do I set up CI/CD with Netlify?

Netlify provides easy CICD integration with github.
Integrate netlify with your repo and Specify your build command and build output directory.

Follow the below given video to setup CICD for your github repo.

**Reference:** [Netlify CI/CD setup video](https://www.youtube.com/watch?v=4h8B080Mv4U)

## Create a board in Notion

- Create a board in notion.

- Add few entries to it with relevant data, for this use case I have added name, jobTitle, profilePic, rank etc.

- Keep entries in each category. (Later we can move these items to done, that would publish them on website)

- Note down the database ID of this board. This will be used in API to query data.

`https://www.notion.so/{DB_ID}?v={VIEW_ID}`

![notion board](/assets/team_before.webp)

> Names from the Done column should appear on website

## How do I create a Notion integration?

- Create new integration in notion

This would give you a API key to use within your queries.

Make sure not to commit this to github (or any other SCM).

![notion integration](/assets/notion_integration.webp)

> Navigate to Notion developer --> my-integrations

## Share page with notion integration

- By using share page button, share you board with notion integration you created in last step.

![share page](/assets/share_notion_page.webp)

> This makes your content available to the integration, can be accessed using API now.

## How do I fetch Notion data at build time?

- Add `NOTION_API_KEY` and `NOTION_DB_ID` in env variables.

![netlify_env](/assets/netlify_env.webp)

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

![website before](/assets/site_before.webp)

2. Suppose Hiring manager finalise to **hire two new developers** and that should show on your website. Move their entries to the `Done` column in notion.

![team_after](/assets/team_after.webp)

3. Now **trigger a new build** in netlify to deploy these changes (with `clear cache and deploy site` option).

![trigger deploy](/assets/netlify_deploy.webp)

4. After deploy the **new members** will show on the website

![website after](/assets/site_after.webp)

> Website has been deployed with new data fetched at build time.

Full code for this can be found on [github](https://github.com/ssghait007/notion-as-cms)

## Should I fetch Notion data at build time or at runtime?

This demo shows example to inject data at runtime, As this data is changed less frequently.

For use cases like product page, data will be changed rapidly .

You can use the [official Notion JavaScript client](https://www.npmjs.com/package/@notionhq/client) to fetch this data on the server when the page loads. Keep your API key on the server; never ship it to the browser.

## Frequently Asked Questions

### Is Notion a good CMS for a production website?

For small, slowly changing content like a team page, yes. For large or fast-changing content, a dedicated headless CMS is more reliable, because Notion's API has rate limits and page-size limits.

### Why fetch Notion data at build time instead of in the browser?

The page stays fast and static, and your Notion API key never reaches the browser. The trade-off is that you need a new build to show new data.

### Can I rebuild the site automatically when Notion changes?

Yes. Create a Netlify build hook and call it from an automation tool, or on a schedule, whenever the board changes.

## References

- [Notion API: Query a database](https://developers.notion.com/reference/post-database-query)
- [Notion JavaScript SDK](https://github.com/makenotion/notion-sdk-js)
- [Netlify: Build hooks](https://docs.netlify.com/configure-builds/build-hooks/)
- [notion-as-cms demo code](https://github.com/ssghait007/notion-as-cms)
