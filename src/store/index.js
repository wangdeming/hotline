import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index: 'index',
    dept: {},
    event: {},
  },
  getters: {},
  //dispatch - async
  actions: {},
  //commit - global sync
  mutations: {
    setIndex (state, type) {
      state.index = type
    },
    setDept (state, dept) {
      state.dept = dept
    },
    setEvent (state, event) {
      state.event = event
    }
  },
  // modules: {
  //   dialog: dialog_store
  // }
})
