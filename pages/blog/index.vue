<template>
  <BlogContent :posts="posts"></BlogContent>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog')
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      posts,
    }
  },
}
</script>
