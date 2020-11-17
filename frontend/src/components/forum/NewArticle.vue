<template>
  <div>
    <form>
      <div class="form-div">
        <div v-if="edit">
          <h1>{{ article.title }}</h1>
        </div>
        <div v-else>
          <label for="title">Titre :</label><br>
          <input type="text" v-model="article.title" id="title">
        </div>
      </div>
      <div v-if="addSharedArticle" class="sharedArticle">
        <h1 class="sharedArticle_title"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ sharedArticle.title }}</h1>
      </div>
      <div class="form-div">
        <label for="content">Contenu :</label><br>
        <textarea id="content" v-model="article.content" rows="20" cols="100" maxlength="20000"></textarea>
      </div>
      <div class="form-div">
        <div v-if="edit">
          <input type="submit" value="Éditer" class="submit" @click.prevent="update">
        </div>
        <div v-else>
          <input type="submit" value="Publier" class="submit" @click.prevent="publish">
        </div>
      </div>
    </form>
    <button class="button" @click="cancelPublishRequest">Annuler</button>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'NewArticle',
    props: {
      article: {
        type: Object,
        required: true
      },
      cancelPublishRequest: {
        type: Function,
        required: true
      }
    },
    computed: {
      ...mapState(['edit', 'addSharedArticle', 'sharedArticle'])
    },
    methods: {
      ...mapActions(['publish', 'update'])
    }
  }
</script>