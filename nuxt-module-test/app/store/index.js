const state = () => ({
  count: 0
})

const getters = {
  count: (state) => state.count
}

const mutations = {
  increment(state) {
    state.count++
  }
}

const actions = {
  increment({ commit }) {
    commit('increment')
  }
}

//module.exports = {
export default {
  state,
  getters,
  mutations,
  actions
}
