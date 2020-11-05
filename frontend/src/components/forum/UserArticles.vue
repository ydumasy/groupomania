<template>
  <div>
    <div v-for="item in userArticles" :key="item.id" class="articles">    
      <h1>{{ item.title }}</h1>
      <div v-if="item.sharedArticleTitle !== null" class="sharedArticle">
        <h1 class="sharedArticle_title" @click="getArticle(item.sharedArticleId)"><img src="../../assets/share-icon.png" alt="Logo de partage d'articles" class="sharedArticle_title--img">{{ item.sharedArticleTitle }}</h1>
      </div>
      <p class="article-txt">{{ item.content }} <span v-if="item.content !== item.fullContent" class="readMore" @click="showFullArticle(item)">Lire la suite</span></p>
      <button @click="deleteArticle(item)">Supprimer</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserArticles',
    props: {
      userArticles: {
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
      }
    }
  }
</script>