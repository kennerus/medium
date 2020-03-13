import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('user-token') || '',
    userEmail: localStorage.getItem('user-email') || '',
    user: {
      email: '',
      password: '',
      role: '',
      id: null,
    },
  },

  getters: {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token,
    user: state => state.user,
    userEmail: state => state.userEmail,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },

    SET_USER: (state, user) => {
      state.user = user;
    },
  },

  actions: {
    AUTH_SUCCESS: ({commit}, token) => {
      commit('SET_TOKEN', token);
    },

    AUTH_LOGOUT: ({commit}) => {
      commit('SET_TOKEN', '');
      commit('SET_USER', {
        email: '',
        password: '',
        role: '',
        id: null,
      });

      localStorage.removeItem('user-token');
      localStorage.removeItem('user-email');
    },

    SET_USER: ({commit}, user) => {
      commit('SET_USER', user);
    },
  },
})
