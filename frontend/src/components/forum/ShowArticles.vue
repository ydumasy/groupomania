<template>
  <div>
    <div v-for="item in articles" :key="item.id" class="articles">
      <h1>{{ item.title }}</h1>
      <div v-if="item.author !== user.pseudo">
        <p><em>Article rédigé par {{ item.author }} le {{ item.publicationDate }} à {{ item.publicationTime }}</em></p>
        <div v-if="item.publicationDate !== item.modificationDate || item.publicationTime !== item.modificationTime">
          <p><em>Dernière modification le {{ item.modificationDate }} à {{ item.modificationTime }}</em></p>
        </div>
      </div>
      <div v-if="item.sharedArticleTitle !== null" class="sharedArticle">
        <h1 class="sharedArticle_title" @click="getArticle(item.sharedArticleId)"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ item.sharedArticleTitle }}</h1>
      </div>
      <p v-for="(paragraph, index) in item.content" :key="index" class="article-txt">{{ paragraph }} <span v-if="item.content !== item.fullContent && index === (item.content.length - 1)" class="readMore" @click="getArticle(item.id)">Lire la suite</span></p>
      <button class="button" @click="showComments(item)">Voir les commentaires</button>
      <button class="button" @click="share(item)">Partager</button>
      <button v-if="item.author === user.pseudo" class="button" @click="editArticle(item)">Modifier</button>
      <button v-else-if="item.author !== user.pseudo && user.admin" class="btnAdmin" @click="editArticle(item)">Modérer</button>
      <button v-if="item.author === user.pseudo" class="button" @click="deleteArticle(item)">Supprimer</button>
      <button v-else-if="item.author !== user.pseudo && user.admin" class="btnAdmin" @click="deleteArticle(item)">Supprimer l'article</button>
      <ShowComments
        :user="user"
        :article="item"
        :comment="comment"
        :comments="comments"
        :editComment="editComment"
        :addComment="addComment"
        :updateComment="updateComment"
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
      comment: {
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
      editArticle: {
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
      },
      share: {
        type: Function,
        required: true
      }
    }
  }
</script>