<template>
  <div>
    <form>
      <p>Veuillez rentrer au moins 1 paramètre :</p>
      <div class="form-div">
        <label for="date" class="search">Date :</label>
        <input type="date" v-model="searchOptions.date" id="date">
      </div>
      <div class="form-div">
        <label for="author" class="search">Auteur :</label>
        <input type="text" v-model="searchOptions.author" id="author" maxlength="20">
      </div>
      <div class="form-div">
        <input type="submit" value="Recherche" class="submit" @click.prevent="search">
      </div>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'SearchArticle',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    computed: {
      ...mapState(['searchOptions'])
    },
    methods: {
      ...mapActions(['search'])
    }
  }
</script>