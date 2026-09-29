// All authors as a slug -> author map. One shared, serializable useAsyncData call,
// so every card on every listing page resolves the real author (and avatar).
export const useAuthors = async () => {
  const { data } = await useAsyncData('authors-all', () => queryCollection('authors').all())
  return computed(() => Object.fromEntries((data.value || []).map((author) => [author.slug, author])))
}
