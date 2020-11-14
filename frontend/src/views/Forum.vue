<template>
  <div class="forum">
    <div v-if="main">
      <p>Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos collègues des articles sur des sujets qui vous intéressent.</p>
      <button class="forum-btn" @click="newArticle">Publier un article</button>
      <button class="forum-btn" @click="showUserArticles">Mes articles</button>
      <button class="forum-btn" @click="readLastArticles">Articles récents</button>
      <button class="forum-btn" @click="findArticle">Rechercher un article</button>

      <div v-if="publication && connected">
        <NewArticle
          :edit="edit"
          :article="article"
          :addSharedArticle="addSharedArticle"
          :sharedArticle="sharedArticle"
          :publish="publish"
          :update="update"
          :cancelPublishRequest="cancelPublishRequest"
        />
      </div>

      <div v-if="showArticles && connected">
        <ShowArticles
          :user="user"
          :comment="comment"
          :articles="articles"
          :comments="comments"
          :getArticle="getArticle"
          :editArticle="editArticle"
          :deleteArticle="deleteArticle"
          :showComments="showComments"
          :editComment="editComment"
          :addComment="addComment"
          :updateComment="updateComment"
          :deleteComment="deleteComment"
          :share="share"
        />
      </div>

      <div v-if="searchArticle">
        <SearchArticle
          :searchOptions="searchOptions"
          :search="search"
        /> 
      </div>
    </div>

    <div v-else>
      <h1>{{ article.title }}</h1>
      <p v-for="(paragraph, index) in article.content" :key="index" class="article-txt">{{ paragraph }}</p>
      <button @click="returnToMain">Retour</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NewArticle from '@/components/forum/NewArticle.vue';
  import ShowArticles from '@/components/forum/ShowArticles.vue';
  import SearchArticle from '@/components/forum/SearchArticle.vue';

  export default {
    name: 'Forum',
    components: {
      NewArticle,
      ShowArticles,
      SearchArticle
    },
    computed: {
      ...mapState(['main', 'article', 'comment', 'sharedArticle', 'searchOptions', 'articles', 'comments', 'publication', 'edit', 'addSharedArticle', 'showArticles', 'searchArticle', 'user', 'connected'])
    },
    methods: {
      ...mapActions(['connectUser', 'showUser', 'newPage', 'newArticle', 'showUserArticles', 'readLastArticles', 'findArticle', 'publish', 'update', 'cancelPublishRequest', 'getArticle', 'returnToMain', 'search', 'share', 'editArticle', 'deleteArticle', 'showComments', 'editComment', 'addComment', 'updateComment', 'deleteComment']),
    },
    beforeMount() {
      if(localStorage.getItem('pseudo') !== null || sessionStorage.getItem('pseudo') !== null) {
        this.showUser();
        this.connectUser();
        this.newPage();
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.publication === true) {
        this.cancelPublishRequest()
          .then(result => {
            if(result) {
              next();
            } else {
              next(false);
            }
          })
          .catch(error => console.log(error));
      } else {
        next();
      }
      
    }
  };
</script>

<style lang="scss">
.forum-btn {
  font-size: 1rem;
  margin: 10px 20px;
  cursor: pointer;
}

.btnAdmin {
  font-size: 0.85rem;
  margin: 10px 20px;
  cursor: pointer;
  background: #ee0700;
}

.sharedArticle {
  &_title {
    font-size: 1rem;
    cursor: pointer;
    &--img {
      margin-right: 10px;
      -webkit-transform: translateY(20%);
              transform: translateY(20%);
    }
  }
}

.articles {
  margin: 40px;
}

.article-txt, .comment-txt {
  font-weight: 400;
  text-align: justify;
  .readMore {
    color: #fff;
    font-weight: 500;
    text-decoration: underline;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
}

.comment-txt {
  margin: 0px;
}
</style>