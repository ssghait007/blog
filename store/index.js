export const state = () => {
  return {
    posts: [],
  };
};

export const actions = {
  async fetchPosts({ commit }, { $content, category }) {
    try {
      let posts = [];
      if (category) {
        posts = await $content("blog")
          .where({ published: { $eq: true }, category: { $eq: category } })
          .sortBy("createdAt", "desc")
          .fetch();
      } else {
        posts = await $content("blog").sortBy("createdAt", "desc").fetch();
      }
      commit("SET_POSTS", posts);
    } catch (e) {
      commit("SET_POSTS", []);
    }
  },
};

export const mutations = {
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
};
