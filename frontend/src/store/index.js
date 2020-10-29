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
    msgError: false,
    keepConnexion: false,
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
    GET_ERROR(state) {
      state.msgError = true;
    },
    HIDE_ERROR(state) {
      state.msgError = false;
    },
    SHOW_USER(state) {
      if (localStorage.getItem('pseudo') !== null) {
        state.user.pseudo = localStorage.getItem('pseudo');
      } else {
        state.user.pseudo = sessionStorage.getItem('pseudo');
      }
    },
    KEEP_USER_CONNECTED(state) {
      state.keepConnexion = true;
    },
    GET_DELETE_REQUEST(state) {
      state.deleteQuery = true;
    },
    CANCEL(state) {
      state.deleteQuery = false;
    }
  },
  actions: {
    registerUser({ commit }) {
      commit('HIDE_ERROR');
      commit('REGISTERED');
    },
    unregisterUser({ commit }) {
      commit('HIDE_ERROR');
      commit('UNREGISTERED');
    },
    connectUser({ commit }) {
      commit('CONNECTED');
    },
    disconnectUser({ state, commit }) {
      commit('DISCONNECTED');
      localStorage.clear();
      sessionStorage.clear();
      state.keepConnexion = false;
      location.reload();
    },
    keepUserConnected({ commit }) {
      commit('KEEP_USER_CONNECTED');
    },
    getDeleteRequest({ commit }) {
      commit('GET_DELETE_REQUEST');
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
          if (state.keepConnexion === true) {
            localStorage.setItem('pseudo', state.user.pseudo);
          } else {
            sessionStorage.setItem('pseudo', state.user.pseudo);
          }
          commit('REGISTERED');
          commit('CONNECTED');
        })
        .catch(error => {
          commit('GET_ERROR');
          console.log(error)
        });
    },
    login({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/login', { pseudo: state.user.pseudo, password: state.user.password })
        .then(response => {
          console.log(response);
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          if (state.keepConnexion === true) {
            localStorage.setItem('pseudo', state.user.pseudo);
          } else {
            sessionStorage.setItem('pseudo', state.user.pseudo);
          }
          commit('CONNECTED');
        })
        .catch(error => {
          commit('GET_ERROR');
          console.log(error)
        });
    },
    deleteUser({ state, commit }, e) {
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
          sessionStorage.clear();
          commit('DISCONNECTED');
          state.keepConnexion = false;
          commit('CANCEL');
          console.log(response);
        })
        .catch(error => console.log(error));
    },
  }
})