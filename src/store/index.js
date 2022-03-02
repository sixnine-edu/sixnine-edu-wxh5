import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      id: 0,
      userName: "",
      empName: ""
  },
  mutations: {
	  updateId(state, id) {
	      state.id = id
	  },
	  updateUserName(state, name) {
	      state.userName = name
	  },
	  updateEmpName(state, name) {
	      state.empName = name
	  }
  },
  actions: {
  },
  modules: {
  }
})