<template>
  <div>
    <div v-for="item in articles" :key="item.id" class="articles">
      <h1>{{ item.title }}</h1>
      <div v-if="item.author !== user.pseudo">
        <p><em>Article rédigé par {{ item.author }} le {{ item.date }}</em></p>
      </div>
      <div v-if="item.sharedArticleTitle !== null" class="sharedArticle">
        <h1 class="sharedArticle_title" @click="getArticle(item.sharedArticleId)"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ item.sharedArticleTitle }}</h1>
      </div>
      <p class="article-txt">{{ item.content }} <span v-if="item.content !== item.fullContent" class="readMore" @click="getArticle(item.id)">Lire la suite</span></p>
      <button class="button" @click="showComments(item)">Voir les commentaires</button>
      <button class="button" @click="share(item)">Partager</button>
      <button v-if="item.author === user.pseudo" class="button" @click="deleteArticle(item)">Supprimer</button>
      <button v-else-if="item.author !== user.pseudo && user.admin" class="btnAdmin" @click="deleteArticle(item)">Supprimer l'article</button>
      <ShowComments
        :user="user"
        :article="item"
        :comments="comments"
        :newComment="newComment"
        :addComment="addComment"
        :deleteComment="deleteComment"
      />
    </div>
  </div>
</template>

<script>
  import ShowComments from '@/components/forum/ShowComments.vue';

  export default {
    name: 'ShowArticles',
    components: {
      ShowComments
    },
    props: {
      user: {
        type: Object,
        required: true
      },
      articles: {
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