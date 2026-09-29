// Tells Bing (and other IndexNow engines) which URLs are new or changed.
// Usage: npm run indexnow            (submits every URL in the live sitemap)
//        npm run indexnow -- <url>…  (submits only the URLs given)
// Run it AFTER the site has deployed, so the key file is reachable.
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const HOST = 'onthegoalways.com'
const SITE_URL = `https://${HOST}`

const files = await readdir(join(process.cwd(), 'public'))
const keyFile = files.find((name) => /^[a-f0-9]{32}\.txt$/.test(name))
if (!keyFile) throw new Error('IndexNow key file not found in public/')
const key = keyFile.replace('.txt', '')

let urls = process.argv.slice(2)
if (urls.length === 0) {
  const sitemap = await (await fetch(`${SITE_URL}/sitemap.xml`)).text()
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

const response = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE_URL}/${keyFile}`, urlList: urls }),
})

console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${response.status}`)
if (!response.ok && response.status !== 202) process.exitCode = 1
