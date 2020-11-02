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
    keepConnexion: false,
    deleteQuery: false,

    article: {
      title: '',
      content: ''
    },
    comment: {
      content: ''
    },
    userArticles: [],
    lastArticles: [],
    comments: [],
    publication: false,
    userPublications: false,
    findLastArticles: false,
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
    },
    SHOW_USER_PUBLICATIONS(state) {
      state.userPublications = true;
    },
    HIDE_USER_PUBLICATIONS(state) {
      state.userPublications = false;
    },
    SHOW_LAST_ARTICLES(state) {
      state.findLastArticles = true;
    },
    HIDE_LAST_ARTICLES(state) {
      state.findLastArticles = false;
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
          alert("Désolé, une erreur est survenue. Il est possible que vous utilisiez un pseudo ou une adresse mail déjà existants.");
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
          alert("Désolé, une erreur est survenue. Veuillez vérifier votre pseudo et votre mot de passe.");
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

    newPage({ commit }) {
      commit('CANCEL_PUBLISH_REQUEST');
      commit('HIDE_USER_PUBLICATIONS');
      commit('HIDE_LAST_ARTICLES');
    },
    newArticle({ state, commit }) {
      if (state.connected) {
        commit('HIDE_USER_PUBLICATIONS');
        commit('HIDE_LAST_ARTICLES');
        commit('GET_PUBLISH_REQUEST');
      } else {
        alert("Vous devez être connecté pour pouvoir publier un article");
      }
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
        .catch(error => {
          alert("Une erreur est survenue. Vérifiez que tous les champs sont bien remplis.");
          console.log(error);
        });
    },
    cancelPublishRequest({ commit }) {
      commit('CANCEL_PUBLISH_REQUEST');
    },
    showUserArticles({ state, commit }) {
      if (state.connected) {
        axios.get('/articles/' + state.user.pseudo)
        .then(sqlDatas => {
          let jsonDatas = JSON.stringify(sqlDatas);
          let globalDatas = JSON.parse(jsonDatas);
          let articles = globalDatas.data.articles;
          if (articles.length === 0) return alert("Aucun article trouvé");
          state.userArticles.splice(0, state.userArticles.length);
          for (let article of articles) state.userArticles.push({ id: article.id, title: article.title, content: article.content });
          commit('CANCEL_PUBLISH_REQUEST');
          commit('HIDE_LAST_ARTICLES');
          commit('SHOW_USER_PUBLICATIONS');
        })
        .catch(error => console.log(error));
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }    
    },
    deleteArticle({ state, dispatch }, article) {
      if (confirm("Êtes-vous sûr de vouloir supprimer votre article ?")) {
        axios({
          method: 'DELETE',
          url: '/articles',
          data: {
            title: article.title,
            content: article.content,
            author: state.user.pseudo
          }
        })
          .then(response => {
            console.log(response);
            alert("Votre article a bien été supprimé");
            dispatch('showUserArticles');
          })
          .catch(error => {
            alert("Une erreur est survenue");
            console.log(error);
          });
      }
    },
    readLastArticles({ state, commit }) {
      if (state.connected) {
        axios.get('/articles')
        .then(sqlDatas => {
          let jsonDatas = JSON.stringify(sqlDatas);
          let globalDatas = JSON.parse(jsonDatas);
          let articles = globalDatas.data.articles;
          if (articles.length === 0) return alert("Aucun article disponible");
          state.lastArticles.splice(0, state.lastArticles.length);
          for (let article of articles) state.lastArticles.push({ id: article.id, title: article.title, author: article.author, date: article.createdAt.split('T')[0], content: article.content, getComments: false, noComment: false, newComment: false });
          commit('CANCEL_PUBLISH_REQUEST');
          commit('HIDE_USER_PUBLICATIONS');
          commit('SHOW_LAST_ARTICLES');
        })
        .catch(error => console.log(error));
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }
    },
    showComments({ state }, article) {
      axios.get('/comments/' + article.id)
        .then(sqlDatas => {
          let jsonDatas = JSON.stringify(sqlDatas);
          let globalDatas = JSON.parse(jsonDatas);
          let comments = globalDatas.data.comments;
          state.comments.splice(0, state.comments.length);
          for (let article of state.lastArticles) {
            article.getComments = false;
            article.noComment = false;
            article.newComment = false;
          }
          if (comments.length === 0) return article.noComment = true;
          for (let comment of comments) state.comments.push({ id: comment.id, author: comment.author, date: comment.createdAt.split('T')[0], content: comment.content });
          article.getComments = true;
        })
        .catch(error => console.log(error));
    },
    addComment({ state, dispatch }, article) {
      axios.post('/comments', {
        author: state.user.pseudo,
        content: state.comment.content,
        article_id: article.id
      })
        .then(response => {
          console.log(response);
          alert('Votre commentaire a bien été ajouté');
          article.newComment = false,
          dispatch('showComments', article);
        })
        .catch(error => console.log(error));
    }
  }
})