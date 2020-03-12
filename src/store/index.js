import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },
  actions: {
    AUTH_SUCCESS: ({commit}, token) => {
      commit('SET_TOKEN', token);
    },

    AUTH_LOGOUT: ({commit}) => {
      commit('SET_TOKEN', '');
      localStorage.removeItem('user-token');
    },
  },
  getters: {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token
  }
})
