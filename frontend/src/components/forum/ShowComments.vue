<template>
  <div>
    <div v-if="article.getComments">
      <div v-for="item in comments" :key="item.id">
        <p><strong>{{ item.author }}</strong>, le <em>{{ item.publicationDate }}</em> à <em>{{ item.publicationTime }}</em></p>
        <div v-if="item.publicationDate !== item.modificationDate || item.publicationTime !== item.modificationTime">
          <p><em>Mis à jour le {{ item.modificationDate }} à {{ item.modificationTime }}</em></p>
        </div>
        <p v-for="(paragraph, index) in item.content" :key="index" class="comment-txt">{{ paragraph }}</p>
        <button v-if="item.author === user.pseudo" class="button" @click="editComment(item), newComment(article)">Modifier</button>
        <button v-else-if="user.admin" class="btnAdmin" @click="editComment(item), newComment(article)">Modérer</button>
        <button v-if="item.author === user.pseudo" class="button" @click="deleteComment(item)">Supprimer</button>
        <button v-else-if="user.admin" class="btnAdmin" @click="deleteComment(item)">Supprimer le commentaire</button>
      </div>
      <button class="button" @click="newComment(article)">Ajouter un commentaire</button>
    </div>
    <div v-if="article.noComment">
      <p>Aucun commentaire</p>
      <button class="button" @click="newComment(article)">Ajouter un commentaire</button>
    </div>
    <div v-if="article.newComment">
      <form>
        <div class="form-div">          
          <label for="comment">Votre commentaire :</label><br>
          <textarea id="comment" v-model="comment.content" rows="10" cols="50" maxlength="2000"></textarea>
        </div>
        <div class="form-div">
          <div v-if="article.getComments || article.noComment">
            <input type="submit" value="Poster" class="submit" @click.prevent="addComment(article)">
            <button @click="cancelComment(article)" class="button">Annuler</button>
          </div>
          <div v-else>
            <input type="submit" value="Modifier" class="submit" @click.prevent="updateComment(article)">
            <button @click="cancelComment(article)" class="button">Annuler</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShowComments',
    props: {
      user: {
        type: Object,
        required: true
      },
      article: {
        type: Object,
        required: true
      },
      comment: {
        type: Object,
        required: true
      },
      comments: {
        type: Array,
        required: true
      },
      editComment: {
        type: Function,
        required: true
      },
      addComment: {
        type: Function,
        required: true
      },
      updateComment: {
        type: Function,
        required: true
      },
      deleteComment: {
        type: Function,
        required: true
      }
    },
    methods: {
      newComment(article) {
        if (this.comment.content !== null) {
          article.getComments = false;
          article.noComment = false;
        }
        article.newComment = true;
      },
      cancelComment(article) {
        article.newComment = false;
      }
    }
  }
</script>