import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pseudo: '',
    userSignup: {
      firstName: '',
      lastName: '',
      email: '',
      pseudo: '',
      password: ''
    },
    userLogin: {
      pseudo: '',
      password: ''
    },
    connected: false,
    registered: true
  },
  mutations: {
    REGISTERED(state) {
      state.registered = true;
    },
    UNREGISTERED(state) {
      state.registered = false;
    },
    CONNECTED(state) {
      state.connected = true;
    },
    DISCONNECTED(state) {
      state.connected = false;
    },
    SHOW_USER(state) {
      state.pseudo = localStorage.getItem('pseudo');
    },
    CHANGE_PSEUDO_SIGNUP(state) {
      state.pseudo = state.userSignup.pseudo;
    },
    CHANGE_PSEUDO_LOGIN(state) {
      state.pseudo = state.userLogin.pseudo;
    }
  },
  actions: {
    registerUser({ commit }) {
      commit('REGISTERED');
    },
    unregisterUser({ commit }) {
      commit('UNREGISTERED');
    },
    connectUser({ commit }) {
      commit('CONNECTED');
    },
    disconnectUser({ commit }) {
      commit('DISCONNECTED');
      localStorage.clear();
      location.reload();
    },
    showUser({ commit }) {
      commit('SHOW_USER');
    },
    signup({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/signup', state.userSignup)
        .then(response => {
          console.log(response);
          commit('CHANGE_PSEUDO_SIGNUP');
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          localStorage.setItem('pseudo', state.pseudo);
          commit('REGISTERED');
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    },
    login({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/login', state.userLogin)
        .then(response => {
          console.log(response);
          commit('CHANGE_PSEUDO_LOGIN');
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          localStorage.setItem('pseudo', state.pseudo);
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    }
  },
  modules: {
  }
})