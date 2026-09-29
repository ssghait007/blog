<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Append the site name to page titles, unless the title already carries it
useHead({
  titleTemplate: (title) =>
    !title || title.includes('Sachin Ghait') ? title || 'Sachin Ghait Blog' : `${title} | Sachin Ghait`,
})
</script>
