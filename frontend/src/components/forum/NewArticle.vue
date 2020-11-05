<template>
  <div>
    <form>
      <div class="form-div">
        <label for="title">Titre :</label><br>
        <input type="text" v-model="title" id="title" @keyup="updateTitle">
      </div>
      <div v-if="addSharedArticle" class="sharedArticle">
        <h1 class="sharedArticle_title"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ sharedArticle.title }}</h1>
      </div>
      <div class="form-div">
        <label for="content">Contenu :</label><br>
        <textarea id="content" v-model="content" rows="20" cols="100" maxlength="20000" @keyup="updateContent"></textarea>
      </div>
      <div class="form-div">
        <input type="submit" value="Publier" class="submit" @click="publish">
      </div>
    </form>
    <button class="button" @click="cancelPublishRequest">Annuler</button>
  </div>
</template>

<script>
  export default {
    name: 'NewArticle',
    props: {
      addSharedArticle: {
        type: Boolean,
        default: false
      },
      sharedArticle: {
        type: Object,
        required: true
      },
      publish: {
        type: Function,
        required: true
      },
      cancelPublishRequest: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      updateTitle() {
        this.$emit('updateTitle', this.title);
      },
      updateContent() {
        this.$emit('updateContent', this.content);
      }
    }
  }
</script>