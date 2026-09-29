<template>
  <section class="text-gray-600 dark:text-gray-300 body-font">
    <div class="container px-5 py-16 mx-auto max-w-3xl">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Developer glossary</h1>
      <p class="leading-relaxed mb-8">
        Short definitions of terms used across this blog, each linked to the post that explains it in depth.
      </p>
      <dl class="space-y-6">
        <div v-for="item in terms" :id="item.id" :key="item.id">
          <dt class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ item.term }}</dt>
          <dd class="mt-1 leading-relaxed">
            {{ item.definition }}
            <NuxtLink :to="item.post" class="underline">{{ item.postLabel }}</NuxtLink>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup>
const terms = [
  {
    id: 'cors',
    term: 'CORS (Cross-Origin Resource Sharing)',
    definition:
      'An HTTP-header based mechanism that lets a server say which other origins a browser may load its resources from. Without it, browsers block cross-origin reads by default.',
    post: '/blog/what-is-cors',
    postLabel: 'Read: What is CORS',
  },
  {
    id: 'preflight',
    term: 'Preflight request',
    definition:
      'An OPTIONS request the browser sends before a non-simple cross-origin request, such as one using PUT or a custom header, to ask the server for permission. The answer can be cached with Access-Control-Max-Age.',
    post: '/blog/what-is-cors',
    postLabel: 'Read: What is CORS',
  },
  {
    id: 'security-headers',
    term: 'HTTP security headers',
    definition:
      'Response headers such as Content-Security-Policy, Strict-Transport-Security and X-Content-Type-Options that instruct the browser to enable protections for your site.',
    post: '/blog/adding-security-headers',
    postLabel: 'Read: How to use security headers',
  },
  {
    id: 'nat-gateway',
    term: 'NAT gateway',
    definition:
      'An AWS managed service placed in a public subnet that lets resources in private subnets, such as a VPC-attached Lambda function, make outbound connections to the internet through the internet gateway.',
    post: '/blog/lambda-in-vpc',
    postLabel: 'Read: Lambda function in a VPC',
  },
  {
    id: 'vpc-endpoint',
    term: 'VPC endpoint',
    definition:
      'A private connection from a VPC to an AWS service that avoids a NAT gateway. Gateway endpoints for S3 and DynamoDB have no charge; interface endpoints are billed per hour and per GB.',
    post: '/blog/lambda-in-vpc',
    postLabel: 'Read: NAT gateway vs VPC endpoint costs',
  },
  {
    id: 'cloudfront',
    term: 'Amazon CloudFront',
    definition:
      "AWS's content delivery network, which serves cached copies of static and dynamic content from edge locations. Hosting a single-page app on it needs custom error responses so client-side routes do not return 403 or 404.",
    post: '/blog/cloudfront-host-spa-website',
    postLabel: 'Read: Hosting an SPA on CloudFront',
  },
  {
    id: 'mcp',
    term: 'MCP (Model Context Protocol)',
    definition:
      'An open protocol, introduced by Anthropic in November 2024, that standardizes how applications provide context and tools to large language models, using JSON-RPC 2.0 between a client and a server.',
    post: '/blog/building-mcp-server-employee-management',
    postLabel: 'Read: Building an MCP server',
  },
  {
    id: 'shamirs-secret-sharing',
    term: "Shamir's Secret Sharing",
    definition:
      'A cryptographic scheme that splits a secret into n shares so that any k of them can rebuild it, while k-1 shares reveal nothing about it.',
    post: '/blog/shamirs-secret-sharing',
    postLabel: "Read: Breaking bad habits with Shamir's Secret Sharing",
  },
  {
    id: 'git-bisect',
    term: 'git bisect',
    definition:
      'A Git command that binary-searches your commit history, asking you to mark commits good or bad, to find the exact commit that introduced a bug.',
    post: '/blog/git-bisect-to-find-buggy-commit',
    postLabel: 'Read: Git bisect',
  },
  {
    id: 'pi-hole',
    term: 'Pi-hole',
    definition:
      'A network-level DNS sinkhole, typically run on a Raspberry Pi, that blocks ads and unwanted domains for every device on your network.',
    post: '/blog/block-ads-on-whole-network',
    postLabel: 'Read: Ad blocker for your whole network',
  },
  {
    id: 'steganography',
    term: 'Steganography',
    definition:
      'The practice of concealing a message inside another medium, such as text, an image, audio, video or network traffic, so that the existence of the message is hidden.',
    post: '/blog/steganography',
    postLabel: 'Read: Steganography',
  },
  {
    id: 'so-reuseaddr',
    term: 'SO_REUSEADDR',
    definition:
      'A socket option that lets a process bind to an address and port that is still in use in certain states. It is why Docker can appear to bind a port already used by a host process.',
    post: '/blog/port-sharing-os-and-docker',
    postLabel: 'Read: Port sharing and SO_REUSEADDR in Docker',
  },
  {
    id: 'selenium',
    term: 'Selenium WebDriver',
    definition:
      'A browser automation library that controls a real browser from code, used for testing and for automating repetitive web tasks.',
    post: '/blog/selenium-automate-browser-tasks',
    postLabel: 'Read: Web automation with Selenium',
  },
  {
    id: 'ngrok',
    term: 'ngrok',
    definition:
      'A tunneling service that exposes a local or home-network service, such as a Raspberry Pi web interface or SSH, to the internet through a public URL.',
    post: '/blog/using-ngrok-to-access-raspberry-pi-from-anywhere',
    postLabel: 'Read: Access a Raspberry Pi with ngrok',
  },
  {
    id: 'ffmpeg-wasm',
    term: 'ffmpeg.wasm',
    definition:
      'FFmpeg compiled to WebAssembly so video and audio can be converted directly in the browser without uploading files to a server.',
    post: '/blog/vue-ffmpeg-wasm',
    postLabel: 'Read: Convert video to GIF with FFmpeg',
  },
]

usePageSeo({
  title: 'Developer glossary: CORS, NAT gateway, MCP and more',
  description:
    'Short definitions of developer terms used on this blog, including CORS, NAT gateway, MCP, Shamir\'s Secret Sharing and git bisect, each linked to a full guide.',
  path: '/glossary',
})
useJsonLd([
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Developer glossary',
    url: `${SITE_URL}/glossary`,
    inLanguage: 'en',
    hasDefinedTerm: terms.map((item) => ({
      '@type': 'DefinedTerm',
      name: item.term,
      description: item.definition,
      url: `${SITE_URL}/glossary#${item.id}`,
      inDefinedTermSet: `${SITE_URL}/glossary`,
    })),
  },
  breadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Glossary', url: `${SITE_URL}/glossary` },
  ]),
])
</script>
