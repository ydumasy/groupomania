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
    UNREGISTERED(state) {
      state.registered = false;
    },
    REGISTERED(state) {
      state.registered = true;
    },
    CONNECTED(state) {
      state.connected = true;
    },
    CHANGE_PSEUDO_SIGNUP(state) {
      state.pseudo = state.userSignup.pseudo;
    },
    CHANGE_PSEUDO_LOGIN(state) {
      state.pseudo = state.userLogin.pseudo;
    }
  },
  actions: {
    newUser({ commit }) {
      commit('UNREGISTERED');
    },
    registeredUser({ commit }) {
      commit('REGISTERED');
    },
    signup({ state, commit }, e) {
      e.preventDefault();
      commit('CHANGE_PSEUDO_SIGNUP');
      axios.post('/users/signup', state.userSignup)
        .then(response => {
          console.log(response);
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
          commit('CONNECTED');
        })
        .catch(error => console.log(error));
    }
  },
  modules: {
  }
})