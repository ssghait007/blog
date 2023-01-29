export const state = () => {
    return {
        posts: [],
    }
}

export const actions = {
    async fetchPosts({ commit }, $content) {
        try {
            const posts = await $content('blog')
                .sortBy('createdAt', 'desc')
                .fetch()
            commit('SET_POSTS', posts)
        } catch (e) {
            commit('SET_POSTS', []);
        }
    },

}

export const mutations = {
    SET_POSTS(state, posts) {
        state.posts = posts
    },

}
