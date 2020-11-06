<template>
  <div>
    <div v-for="item in lastArticles" :key="item.id" class="articles">
      <h1>{{ item.title }}</h1>
      <p><em>Article rédigé par {{ item.author }} le {{ item.date }}</em></p>
      <div v-if="item.sharedArticleTitle !== null" class="sharedArticle">
        <h1 class="sharedArticle_title" @click="getArticle(item.sharedArticleId)"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ item.sharedArticleTitle }}</h1>
      </div>
      <p class="article-txt">{{ item.content }} <span v-if="item.content !== item.fullContent" class="readMore" @click="showFullArticle(item)">Lire la suite</span></p>
      <button class="button" @click="showComments(item)">Voir les commentaires</button>
      <button class="button" @click="share(item)">Partager</button>
      <button v-if="user.admin" class="btnAdmin" @click="deleteArticle(item)">Supprimer l'article</button>
      <div v-if="item.getComments">
        <div v-for="item in comments" :key="item.id">
          <p><strong>{{ item.author }}</strong>, le <em>{{ item.date }}</em> :</p>
          <p class="comment-txt">{{ item.content }}</p>
          <button v-if="user.admin" class="btnAdmin" @click="deleteComment(item)">Supprimer le commentaire</button>
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
      user: {
        type: Object,
        required: true
      },
      lastArticles: {
        type: Array,
        required: true
      },
      comments: {
        type: Array,
        required: true
      },
      getArticle: {
        type: Function,
        required: true
      },
      showFullArticle: {
        type: Function,
        required: true
      },
      deleteArticle: {
        type: Function,
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
      },
      deleteComment: {
        type: Function,
        required: true
      },
      share: {
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