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
    deleteQuery: false,

    article: {
      title: '',
      content: ''
    },
    publication: false
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
    DELETE_REQUEST(state) {
      state.deleteQuery = true;
    },
    CANCEL_DELETE_REQUEST(state) {
      state.deleteQuery = false;
    },

    GET_PUBLISH_REQUEST(state) {
      state.publication = true;
    },
    CANCEL_PUBLISH_REQUEST(state) {
      state.publication = false;
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
      commit('DELETE_REQUEST');
    },
    cancelDeleteRequest({ commit }) {
      commit('CANCEL_DELETE_REQUEST');
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

    newArticle({ state, commit }) {
      if (state.connected) commit('GET_PUBLISH_REQUEST');
    },
    publish({ state, commit }, e) {
      e.preventDefault();
      axios.post('/articles', {
        title: state.article.title,
        content: state.article.content,
        author: state.user.pseudo
      })
        .then(response => {
          console.log(response);
          alert("Votre article a été publié avec succès");
          commit('CANCEL_PUBLISH_REQUEST');
          state.article.title = '';
          state.article.content= '';
        })
        .catch(error => console.log(error));
    },
    cancelPublishRequest({ commit }) {
      if (confirm("Attention, vos modifications seront perdues. Continuer ?")) {
        commit('CANCEL_PUBLISH_REQUEST');
      }
    }
  }
})