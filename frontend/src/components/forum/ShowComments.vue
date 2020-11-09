<template>
  <div>
    <div v-if="article.getComments">
      <div v-for="item in comments" :key="item.id">
        <p><strong>{{ item.author }}</strong>, le <em>{{ item.date }}</em> à <em>{{ item.time }}</em> :</p>
        <p class="comment-txt">{{ item.content }}</p>
        <button v-if="item.author === user.pseudo" class="button" @click="deleteComment(item)">Supprimer</button>
        <button v-else-if="user.admin" class="btnAdmin" @click="deleteComment(item)">Supprimer le commentaire</button>
      </div>
      <button class="button" @click="newComment(item)">Ajouter un commentaire</button>
    </div>
    <div v-if="article.noComment">
      <p>Aucun commentaire</p>
      <button class="button" @click="newComment(item)">Ajouter un commentaire</button>
    </div>
    <div v-if="article.newComment">
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
      comments: {
        type: Array,
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
      }
    }
  }
</script>