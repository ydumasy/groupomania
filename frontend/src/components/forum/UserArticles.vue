<template>
  <div>
    <div v-for="item in userArticles" :key="item.id" class="articles">
      <div v-if="item.fullArticle">
        <h1>{{ item.title }}</h1>
        <p class="article-txt">{{ item.fullContent }}</p>
        <button @click="deleteArticle(item)">Supprimer</button>
      </div>
      <div v-else>
        <h1>{{ item.title }}</h1>
        <p class="article-txt">{{ item.content }} <span v-if="readMore" class="readMore" @click="showFullArticle(item)">Lire la suite</span></p>
        <button @click="deleteArticle(item)">Supprimer</button>
      </div>
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
      fullArticle: {
        type: Boolean,
        default: true
      },
      readMore: {
        type: Boolean,
        default: false
      },
      deleteArticle: {
        type: Function,
        required: true
      }
    },
    methods: {
      showFullArticle(article) {
        article.fullArticle = true;
      }
    }
  }
</script>