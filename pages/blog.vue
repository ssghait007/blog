<template>
  <BlogContent :posts="posts"></BlogContent>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const posts = await $content('blog').fetch()
    return {
      posts,
    }
  },
}
</script>
