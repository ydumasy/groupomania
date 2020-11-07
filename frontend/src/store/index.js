import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      firstName: null,
      lastName: null,
      email: null,
      pseudo: null,
      password: null,
      admin: false,
      token: null
    },
    connected: false,
    registered: true,
    keepConnexion: false,
    deleteQuery: false,

    main: true,
    article: {
      title: null,
      content: null
    },
    comment: {
      content: null
    },
    sharedArticle: {
      id: null,
      title: null
    },
    userArticles: [],
    lastArticles: [],
    comments: [],
    publication: false,
    addSharedArticle: false,
    userPublications: false,
    findLastArticles: false
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
    KEEP_USER_CONNECTED(state) {
      state.keepConnexion = true;
    },
    DELETE_REQUEST(state) {
      state.deleteQuery = true;
    },
    CANCEL_DELETE_REQUEST(state) {
      state.deleteQuery = false;
    },

    SHOW_MAIN_CONTENT(state) {
      state.main = true;
    },
    HIDE_MAIN_CONTENT(state) {
      state.main = false;
    },
    GET_PUBLISH_REQUEST(state) {
      state.publication = true;
    },
    CANCEL_PUBLISH_REQUEST(state) {
      state.publication = false;
    },
    SHARE_ARTICLE(state) {
      state.addSharedArticle = true;
    },
    UNSHARE_ARTICLE(state) {
      state.addSharedArticle = false;
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
    showUser({ state }) {
      if (localStorage.getItem('pseudo') !== null) {
        state.user.pseudo = localStorage.getItem('pseudo');
        state.user.admin = JSON.parse(localStorage.getItem('admin')) === 1 ? true : false;
        state.user.token = localStorage.getItem('token');
      } else {
        state.user.pseudo = sessionStorage.getItem('pseudo');
        state.user.admin = JSON.parse(sessionStorage.getItem('admin')) === 1 ? true : false;
        state.user.token = sessionStorage.getItem('token');
      }
    },
    signup({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/signup', state.user)
        .then(userDatas => {
          let user = userDatas.data;
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          if (state.keepConnexion === true) {
            localStorage.setItem('pseudo', user.pseudo);
            localStorage.setItem('token', user.token);
          } else {
            sessionStorage.setItem('pseudo', user.pseudo);
            sessionStorage.setItem('token', user.token);
          }
          commit('REGISTERED');
          commit('CONNECTED');
        })
        .catch(error => {
          alert("Désolé, une erreur est survenue. Vérifiez que tous les champs sont correctement remplis. Il est possible que vous utilisiez un pseudo ou une adresse mail déjà existants.");
          console.log(error)
        });
    },
    login({ state, commit }, e) {
      e.preventDefault();
      axios.post('/users/login', { pseudo: state.user.pseudo, password: state.user.password })
        .then(userDatas => {
          let user = userDatas.data;
          let admin = user.admin === true ? 1 : 0;
          if (localStorage.getItem('pseudo') !== null) localStorage.clear();
          if (state.keepConnexion === true) {
            localStorage.setItem('pseudo', user.pseudo);
            localStorage.setItem('admin', admin);
            localStorage.setItem('token', user.token);
          } else {
            sessionStorage.setItem('pseudo', user.pseudo);
            sessionStorage.setItem('admin', admin);
            sessionStorage.setItem('token', user.token);
          }
          commit('CONNECTED');
          console.log(userDatas);
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
          alert("Votre compte a bien été supprimé");
          commit('DISCONNECTED');
          state.keepConnexion = false;
          commit('CANCEL');
          console.log(response);
        })
        .catch(error => console.log(error));
    },

    newPage({ commit }) {
      commit('SHOW_MAIN_CONTENT');
      commit('CANCEL_PUBLISH_REQUEST');
      commit('HIDE_USER_PUBLICATIONS');
      commit('HIDE_LAST_ARTICLES');
    },
    newArticle({ state, commit }) {
      if (state.connected) {
        state.article.title = '';
        state.article.content = '';
        commit('HIDE_USER_PUBLICATIONS');
        commit('HIDE_LAST_ARTICLES');
        commit('GET_PUBLISH_REQUEST');
      } else {
        alert("Vous devez être connecté pour pouvoir publier un article");
      }
    },
    publish({ state, commit }, e) {
      e.preventDefault();
      axios({
          method: 'POST',
          url: '/articles',
          data: {
            title: state.article.title,
            content: state.article.content,
            author: state.user.pseudo,
            sharedArticleId: state.sharedArticle.id,
            sharedArticleTitle: state.sharedArticle.title
          },
          headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(response => {
          console.log(response);
          alert("Votre article a été publié avec succès");
          commit('CANCEL_PUBLISH_REQUEST');
          commit('UNSHARE_ARTICLE');
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
    getArticle({ state, commit }, id) {
      axios({
        method: 'GET',
        url: '/articles/' + id,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(articleDatas => {
          let article = articleDatas.data.article;
          state.article.title = article.title;
          state.article.content = article.content;
          commit('HIDE_MAIN_CONTENT');
        })
        .catch(error => {
          alert("Une erreur est survenue. Il est possible que l'article que vous essayez de consulter ait été supprimé.");
          console.log(error);
        });
    },
    showFullArticle({ state, commit }, article) {
      state.article.title = article.title;
      state.article.content = article.fullContent;
      commit('HIDE_MAIN_CONTENT');
    },
    returnToMain({ commit }) {
      commit('SHOW_MAIN_CONTENT');
    },
    deleteArticle({ state, dispatch }, article) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        axios({
          method: 'DELETE',
          url: '/articles',
          data: { id: article.id },
          headers: { 'Authorization': 'Bearer ' + state.user.token }
        })
          .then(response => {
            console.log(response);
            alert("Article supprimé");
            if (!state.user.admin) {
              dispatch('showUserArticles');
            } else {
              dispatch('readLastArticles');
            }
          })
          .catch(error => {
            alert("Une erreur est survenue");
            console.log(error);
          });
      }
    },
    showUserArticles({ state, commit }) {
      if (state.connected) {
        axios({
          method: 'GET',
          url: '/articles/author/' + state.user.pseudo,
          headers: { 'Authorization': 'Bearer ' + state.user.token }
        })
        .then(articlesDatas => {
          let articles = articlesDatas.data.articles;
          state.userArticles.splice(0, state.userArticles.length);
          if (articles.length === 0) {
            alert("Aucun article trouvé");
          } else {
            for (let article of articles) {
              let content = article.content;
              if (content.length > 2000) {
                content = content.substring(0, 2000);
                content += "...";
              }
              state.userArticles.push({ 
                id: article.id,
                title: article.title,
                content: content,
                fullContent: article.content,
                author: article.author,
                sharedArticleTitle: article.sharedArticle_title,
                sharedArticleId: article.sharedArticle_id 
              });
            }
          }
          commit('CANCEL_PUBLISH_REQUEST');
          commit('UNSHARE_ARTICLE');
          commit('HIDE_LAST_ARTICLES');
          commit('SHOW_USER_PUBLICATIONS');
        })
        .catch(error => {
          console.log(error)
        });
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }    
    },
    readLastArticles({ state, commit }) {
      if (state.connected) {
        axios({
          method: 'GET',
          url: '/articles',
          headers: { 'Authorization': 'Bearer ' + state.user.token }
        })
        .then(articlesDatas => {
          let articles = articlesDatas.data.articles;
          if (articles.length === 0) return alert("Aucun article disponible");
          state.lastArticles.splice(0, state.lastArticles.length);
          for (let article of articles) {
            let content = article.content;
            if (content.length > 2000) {
              content = content.substring(0, 2000);
              content += "...";
            }
            state.lastArticles.push({
              id: article.id,
              title: article.title,
              content: content,
              author: article.author,
              date: article.createdAt.split('T')[0],
              fullContent: article.content,
              sharedArticleTitle: article.sharedArticle_title,
              sharedArticleId: article.sharedArticle_id,
              getComments: false,
              noComment: false,
              newComment: false
            });
          }
          commit('CANCEL_PUBLISH_REQUEST');
          commit('UNSHARE_ARTICLE');
          commit('HIDE_USER_PUBLICATIONS');
          commit('SHOW_LAST_ARTICLES');
        })
        .catch(error => console.log(error));
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }
    },
    showComments({ state }, article) {
      axios({
        method: 'GET',
        url: '/comments/' + article.id,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
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
      axios({
        method: 'POST',
        url: '/comments',
        data: {
          author: state.user.pseudo,
          content: state.comment.content,
          article_id: article.id
        },
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(response => {
          console.log(response);
          alert('Votre commentaire a bien été ajouté');
          article.newComment = false,
          dispatch('showComments', article);
        })
        .catch(error => console.log(error));
    },
    deleteComment({ state, dispatch }, comment) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
        axios({
          method: 'DELETE',
          url: '/comments',
          data: { id: comment.id },
          headers: { 'Authorization': 'Bearer ' + state.user.token }
        })
          .then(response => {
            console.log(response);
            alert("Commentaire supprimé");
            dispatch('readLastArticles');
          })
          .catch(error => {
            alert("Une erreur est survenue");
            console.log(error);
          });
      }
    },
    share({ state, commit }, article) {
      commit('HIDE_LAST_ARTICLES');
      commit('GET_PUBLISH_REQUEST');
      commit('SHARE_ARTICLE');
      state.sharedArticle.title = article.title;
      state.sharedArticle.id = article.id;
    }
  }
})