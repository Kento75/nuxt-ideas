export const state = () => ({
  isLoggedIn: false,
  user: null
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) => state.user
}

export const mutations = {
  setUser(state, { user }) {
    state.user = user
    state.isLoggedIn = true
  }
}

export const actions = {
  // ログインアクション
  async login({ commit }, { id }) {
    const user = await this.$axios.$get(`/users/${id}.json`)
    
    if(!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },
  // ユーザー作成アクション
  async register({ commit }, { id }) {
    const payload = {}
    payload[id] = { id }
    await this.$axios.$patch(`/users.json`, payload)
    const user = await this.$axios.$get(`/users/${id}.json`)

    if(!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  }
}
