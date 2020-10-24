import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLogin: {
      pseudo: '',
      password: ''
    },
    userSignup: {
      firstName: '',
      lastName: '',
      email: '',
      pseudo: '',
      password: ''
    },
    connected: false,
    registered: true,
    deleteQuery: false
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
      state.userLogin.pseudo = localStorage.getItem('pseudo');
    },
    DELETE_REQUEST(state) {
      state.deleteQuery = true;
    },
    GET_PSEUDO(state) {
      state.userLogin.pseudo = state.userSignup.pseudo;
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
    deleteRequest({ commit }) {
      commit('DELETE_REQUEST');
    },
    showUser({ commit }) {
      commit('SHOW_USER');
    },
    signup({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/signup', state.userSignup)
        .then(response => {
          console.log(response);
          commit('GET_PSEUDO');
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
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          localStorage.setItem('pseudo', state.userLogin.pseudo);
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    },
    deleteUser({ state }, e) {
      e.preventDefault();
      axios({
        method: 'DELETE',
        url: '/users',
        data: state.userLogin
      })
        .then(response => console.log(response))
        .catch(error => {
          console.log(state.userLogin);
          console.log(error)
        });
    },
  },
  modules: {
  }
})