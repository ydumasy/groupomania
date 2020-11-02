<template>
  <div>
    <div v-for="item in userArticles" :key="item.id" class="articles">
      <h1>{{ item.title }}</h1>
      <p class="article-txt">{{ item.content }}</p>
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
      deleteArticle: {
        type: Function,
        required: true
      }
    }
  }
</script>