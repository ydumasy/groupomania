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
    searchOptions: {
      date: null,
      author: null
    },
    articles: [],
    comments: [],
    publication: false,
    addSharedArticle: false,
    showArticles: false,
    searchArticle: false
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
    SHOW_ARTICLES(state) {
      state.showArticles = true;
    },
    HIDE_ARTICLES(state) {
      state.showArticles = false;
    },
    SEARCH_ARTICLE(state) {
      state.searchArticle = true;
    },
    UNSEARCH_ARTICLE(state) {
      state.searchArticle = false;
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
    signup({ state, commit }) {
      axios.post('/users/signup', state.user)
        .then(userDatas => {
          let user = userDatas.data;
          if (localStorage.getItem('pseudo') !== null) {
            localStorage.clear();
          }
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
    login({ state, commit }) {
      axios.post('/users/login', { pseudo: state.user.pseudo, password: state.user.password })
        .then(userDatas => {
          let user = userDatas.data;
          let admin = user.admin === true ? 1 : 0;
          if (localStorage.getItem('pseudo') !== null) {
            localStorage.clear();
          }
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
    deleteUser({ state, commit }) {
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
        .catch(error => {
          alert("Une erreur est survenue. Veuillez vérifiez que votre mot de passe est correct.")
          console.log(error);
        });
    },

    newPage({ commit }) {
      commit('SHOW_MAIN_CONTENT');
      commit('CANCEL_PUBLISH_REQUEST');
      commit('HIDE_ARTICLES');
      commit('UNSEARCH_ARTICLE');
    },
    newArticle({ state, commit }) {
      if (state.publication === true) {
        return;
      }
      if (state.connected) {
        state.article.title = null;
        state.article.content = null;
        commit('HIDE_ARTICLES');
        commit('UNSEARCH_ARTICLE');
        commit('GET_PUBLISH_REQUEST');
      } else {
        alert("Vous devez être connecté pour pouvoir publier un article");
      }
    },
    showUserArticles({ state, dispatch }) {
      if (state.connected) {
        if (state.publication === true) {
         dispatch('cancelPublishRequest')
          .then(result => {
            if (result) {
              dispatch('searchByAuthor', state.user.pseudo);
            } else {
              return;
            }
          })
          .catch(error => console.log(error));
        } else {
          dispatch('searchByAuthor', state.user.pseudo);
        }
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }   
    },
    readLastArticles({ state, dispatch }) {
      if (state.connected) {
        if (state.publication === true) {
          dispatch('cancelPublishRequest')
            .then(result => {
              if (result) {
                dispatch('getLastArticles');
              } else {
                return;
              }
            })
            .catch(error => console.log(error));
        } else {
          dispatch('getLastArticles');
        }
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }
    },
    findArticle({ state, commit, dispatch }) {
      if (state.connected) {
        if (state.publication === true) {
          dispatch('cancelPublishRequest')
            .then(result => {
              if (result) {
                state.searchOptions.date = null;
                state.searchOptions.author = null;
                commit('HIDE_ARTICLES');        
                commit('SEARCH_ARTICLE');
              } else {
                return;
              }
            })
            .catch(error => console.log(error));
        } else {
          state.searchOptions.date = null;
          state.searchOptions.author = null;
          commit('HIDE_ARTICLES'); 
          commit('SEARCH_ARTICLE');
        }
      } else {
        alert("Vous devez être connecté pour accéder à cette session");
      }
    },
    publish({ state, commit }) {
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
    cancelPublishRequest({ state, commit }) {
      if (state.article.title !== null || state.article.content !== null) {
        if (confirm("Attention, vos changements seront perdus. Continuer ?")) {
          commit('CANCEL_PUBLISH_REQUEST');
          return true;
        } else {
          return false;
        }
      } else {
        commit('CANCEL_PUBLISH_REQUEST');
        return true;
      }
    },
    getArticle({ state, commit }, id) {
      axios({
        method: 'GET',
        url: '/articles/' + id,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(datas => {
          let article = datas.data.article;
          let content = article.content.split('\n');
          state.article.title = article.title;
          state.article.content = content;
          commit('HIDE_MAIN_CONTENT');
        })
        .catch(error => console.log(error));
    },
    returnToMain({ commit }) {
      commit('SHOW_MAIN_CONTENT');
    },
    search({ state, dispatch }) {
      if (state.searchOptions.date !== null && state.searchOptions.author === null) {
        dispatch('searchByDate', state.searchOptions.date);
      } else if (state.searchOptions.date === null && state.searchOptions.author !== null) {
        dispatch('searchByAuthor', state.searchOptions.author);
      } else if (state.searchOptions.date !== null && state.searchOptions.author !== null) {
        dispatch('completeResearch', state.searchOptions);
      } else {
        alert("Vous devez renseigner au moins un paramètre");
      }
    },
    searchByDate({ state, dispatch }) {
      axios({
        method: 'GET',
        url: '/articles/date/' + state.searchOptions.date,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
      .then(datas => dispatch('showArticles', datas))
      .catch(error => console.log(error));
    },
    searchByAuthor({ state, dispatch }, author) {
      axios({
        method: 'GET',
        url: '/articles/author/' + author,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(datas => dispatch('showArticles', datas))
        .catch(error => console.log(error));
    },
    completeResearch({ state, dispatch }, params) {
      axios({
        method: 'GET',
        url: `/articles/${params.date}/${params.author}`,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(datas => dispatch('showArticles', datas))
        .catch(error => console.log(error));
    },
    getLastArticles({ state, dispatch }) {
      axios({
        method: 'GET',
        url: '/articles',
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(datas => dispatch('showArticles', datas))
        .catch(error => console.log(error));
    },
    showArticles({ state, commit }, datas) {
      let articles = datas.data.articles;
      if (articles.length === 0) {
        return alert("Aucun article disponible");
      }
      state.articles.splice(0, state.articles.length);
          for (let article of articles) {
            let content = article.content;
            if (content.length > 2000) {
              content = content.substring(0, 2000);
              content += "...";
            }
            let shortContent = content.split('\n');
            let longContent = article.content.split('\n');
            state.articles.push({
              id: article.id,
              title: article.title,
              content: shortContent,
              author: article.author,
              date: article.createdAt.split('T')[0],
              fullContent: content === article.content ? shortContent : longContent,
              sharedArticleTitle: article.sharedArticle_title,
              sharedArticleId: article.sharedArticle_id,
              getComments: false,
              noComment: false,
              newComment: false
            });
          }
          commit('UNSHARE_ARTICLE');
          commit('UNSEARCH_ARTICLE');
          commit('SHOW_ARTICLES');
    },
    share({ state, commit }, article) {
      commit('GET_PUBLISH_REQUEST');
      commit('SHARE_ARTICLE');
      state.sharedArticle.title = article.title;
      state.sharedArticle.id = article.id;
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
    showComments({ state }, article) {
      axios({
        method: 'GET',
        url: '/comments/' + article.id,
        headers: { 'Authorization': 'Bearer ' + state.user.token }
      })
        .then(datas => {
          let comments = datas.data.comments;
          state.comments.splice(0, state.comments.length);
          for (let article of state.articles) {
            article.getComments = false;
            article.noComment = false;
            article.newComment = false;
          }
          if (comments.length === 0) {
            return article.noComment = true;
          }
          for (let comment of comments) {
            let content = comment.content.split('\n');
            state.comments.push({
              id: comment.id,
              author: comment.author,
              date: comment.createdAt.split('T')[0],
              time: comment.createdAt.split('T')[1].split('.')[0],
              content: content
            });
          }
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
    }
  }
})