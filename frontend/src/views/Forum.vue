<template>
  <div class="forum">
    <p>Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos collègues des articles sur des sujets qui vous intéressent.</p>
    <button class="forum-btn" @click="newArticle">Publier un article</button>
    <button class="forum-btn" @click="showUserArticles">Mes articles</button>
    <button class="forum-btn" @click="readLastArticles">Lire les derniers articles</button>

    <div v-if="publication && connected">
      <NewArticle
        :publish="publish"
        :cancelPublishRequest="cancelPublishRequest"
        @updateTitle="setTitle"
        @updateContent="setContent"
      />
    </div>

    <div v-if="userPublications && connected">
      <UserArticles
        :userArticles="userArticles"
        :deleteArticle="deleteArticle"
      />
    </div>

    <div v-if="findLastArticles && connected">
      <LastArticles
        :lastArticles="lastArticles"
        :comments="comments"
        :showComments="showComments"
        :newComment="newComment"
        :addComment="addComment"
        @updateComment="setComment"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NewArticle from '@/components/forum/NewArticle.vue';
  import UserArticles from '@/components/forum/UserArticles.vue';
  import LastArticles from '@/components/forum/LastArticles.vue';

  export default {
    name: 'Forum',
    components: {
      NewArticle,
      UserArticles,
      LastArticles
    },
    computed: {
      ...mapState(['article', 'comment', 'userArticles', 'lastArticles', 'comments', 'publication', 'userPublications', 'findLastArticles', 'getComments', 'connected'])
    },
    methods: {
      ...mapActions(['newPage', 'newArticle', 'publish', 'cancelPublishRequest', 'showUserArticles', 'deleteArticle', 'readLastArticles', 'showComments', 'addComment', 'connectUser', 'showUser']),
      newComment(article) {
        article.newComment = true;
      },
      setTitle(title) {
        this.article.title = title;
      },
      setContent(content) {
        this.article.content = content;
      },
      setComment(content) {
        this.comment.content = content;
      }
    },
    beforeMount() {
      if(localStorage.getItem('pseudo') !== null || sessionStorage.getItem('pseudo') !== null) {
        this.showUser();
        this.connectUser();
        this.newPage();
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

.articles {
  margin: 40px;
}

.article-txt, .comment-txt {
  font-weight: 400;
}
</style>