<template>
  <div>
    <div v-for="item in lastArticles" :key="item.id" class="articles">
      <h1>{{ item.title }}</h1>
      <p><em>Article rédigé par {{ item.author }} le {{ item.date }}</em></p>
      <p class="article-txt">{{ item.content }}</p>
      <button class="button" @click="showComments(item)">Voir les commentaires</button>
      <div v-if="item.getComments">
        <div v-for="item in comments" :key="item.id">
          <p><strong>{{ item.author }}</strong>, le <em>{{ item.date }}</em> :</p>
          <p class="comment-txt">{{ item.content }}</p>
        </div>
        <button class="button" @click="newComment(item)">Ajouter un commentaire</button>
      </div>
      <div v-if="item.noComment">
        <p>Aucun commentaire</p>
        <button class="button" @click="newComment(item)">Ajouter un commentaire</button>
      </div>
      <div v-if="item.newComment">
        <form>
          <div class="form-div">          
            <label for="comment">Votre commentaire :</label><br>
            <textarea id="comment" v-model="comment" rows="10" cols="50" maxlength="10000" @keyup="updateComment"></textarea>
          </div>
          <div class="form-div">
            <input type="submit" value="Poster" class="submit" @click.prevent="addComment(item)">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LastArticles',
    props: {
      lastArticles: {
        type: Array,
        required: true
      },
      comments: {
        type: Array,
        required: true
      },
      showComments: {
        type: Function,
        required: true
      },
      newComment: {
        type: Function,
        required: true
      },
      addComment: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      updateComment() {
        this.$emit('updateComment', this.comment);
      }
    }
  }
</script>