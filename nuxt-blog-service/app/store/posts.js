import moment from '~/plugins/moment'

export const state = () => ({
  posts: []
})

export const getters = {
  posts: (state) => 
    state.posts.map((post) => Object.assign({ likes: [] }, post))
}

export const mutations = {
  // 記事追加
  addPost(state, { post }) {
    state.posts.push(post)
  },
  // 記事更新
  updatePost(state, { post }) {
    // 対象の記事を編集後の記事に置き換える
    state.posts = state.posts.map((p) => (p.id === post.id ? post : p))
  },
  clearPosts(state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPosts({ commit }, { id }) {
    const post = await this.$axios.$get(`/posts/${id}.json`)
    commit('addPost', { post: { ...post, id } })
  },
  // 記事一覧表示機能
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(`/posts.json`)
    commit('clearPosts')
    Object.entries(posts || [])
      .reverse()
      .forEach(([id, content]) =>
        commit('addPost', {
          post: {
            id,
            ...content
          }
        })
      )
  },
  // 記事投稿機能
  async publishPost({ commit }, { payload }) {
    const user = await this.$axios.$get(`/users/${payload.user.id}.json`)
    const created_at = moment().format()
    const post_id = (await this.$axios.$post('/posts.json', {created_at, ...payload})).name

    // 記事データ作成
    const post = { id: post_id, ...payload, created_at }
    const putData = { id: post_id, ...payload, created_at }

    // ユーザーデータは必要ないため削除
    delete putData.user

    // 記事データを登録
    await this.$axios.$put(`/users/${user.id}/posts.json`, [
      ...(user.posts || []),
      putData
    ])
    commit('addPost', { post })
  },
  // 記事にいいねを追加
  async addLikeToPost({ commit }, { user, post }) {
    post.likes.push({
      created_at: moment().format(),
      user_id: user.id,
      post_id: post.id
    })
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  }
}
