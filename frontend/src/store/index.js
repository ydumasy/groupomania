import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
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
      state.user.pseudo = localStorage.getItem('pseudo');
    },
    DELETE_REQUEST(state) {
      state.deleteQuery = true;
    },
    CANCEL(state) {
      state.deleteQuery = false;
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
    cancelRequest({ commit }) {
      commit('CANCEL');
    },
    showUser({ commit }) {
      commit('SHOW_USER');
    },
    signup({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/signup', state.user)
        .then(response => {
          console.log(response);
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          localStorage.setItem('pseudo', state.user.pseudo);
          commit('REGISTERED');
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    },
    login({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/login', { pseudo: state.user.pseudo, password: state.user.password })
        .then(response => {
          console.log(response);
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          localStorage.setItem('pseudo', state.user.pseudo);
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    },
    deleteUser({ state }, e) {
      e.preventDefault();
      axios({
        method: 'DELETE',
        url: '/users',
        data: {
          pseudo: state.user.pseudo,
          password: state.user.password
        }
      })
        .then(response => {
          localStorage.clear();
          state.connected = false;
          console.log(response);
        })
        .catch(error => console.log(error));
    },
  },
  modules: {
  }
})