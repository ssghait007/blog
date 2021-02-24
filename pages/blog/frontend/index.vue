<template>
  <BlogContent :posts="posts"></BlogContent>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog')
      .where({ published: { $eq: true }, category: { $eq: 'Frontend' } })
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      posts,
    }
  },
}
</script>
