<template>
  <div class="forum">
    <p>Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos collègues des articles sur des sujets qui vous intéressent.</p>
    <button class="forum-btn" @click="newArticle">Publier un article</button>
    <button class="forum-btn" @click="showUserArticles">Mes articles</button>
    <button class="forum-btn" @click="readLastArticles">Lire les derniers articles</button>

    <div v-if="publication && connected">
      <form>
        <div class="form-div">
          <label for="title">Titre :</label><br>
          <input type="text" v-model="article.title" id="title">
        </div>
        <div class="form-div">
          <label for="content">Contenu :</label><br>
          <textarea id="content" v-model="article.content" rows="20" cols="100" maxlength="20000"></textarea>
        </div>
        <div class="form-div">
          <input type="submit" value="Publier" class="submit" @click="publish">
        </div>
      </form>
      <button class="button" @click="cancelPublishRequest">Annuler</button>
    </div>

    <div v-if="userPublications && connected">
      <div v-for="item in userArticles" :key="item.title" class="user-articles">
        <h1>{{ item.title }}</h1>
        <p>{{ item.content }}</p>
        <button @click="deleteArticle(item)">Supprimer</button>
      </div>
    </div>

    <div v-if="findLastArticles">
      <div v-for="item in lastArticles" :key="item.title">
        <h1>{{ item.title }}</h1>
        <p><em>Article rédigé par {{ item.author }} le {{ item.date }}</em></p>
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Forum',
    computed: {
      ...mapState(['article', 'userArticles', 'lastArticles', 'publication', 'userPublications', 'findLastArticles', 'connected'])
    },
    methods: {
      ...mapActions(['newPage', 'newArticle', 'publish', 'cancelPublishRequest', 'showUserArticles', 'deleteArticle', 'readLastArticles', 'connectUser', 'showUser'])
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
}

.user-articles {
  margin: 40px;
}
</style>