<template>
  <div class="forum">
    <div v-if="main">
      <p>Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos collègues des articles sur des sujets qui vous intéressent.</p>
      <p class="get-charter">NB : Avant de participer, merci de lire la <span class="get-charter--link" @click="getCharter">charte</span> indiquant les règles de convivialité à respecter.</p>
      <button class="forum-btn" @click="newArticle">Publier un article</button>
      <button class="forum-btn" @click="showUserArticles">Mes articles</button>
      <button class="forum-btn" @click="readLatestArticles">Articles récents</button>
      <button class="forum-btn" @click="findArticle">Rechercher un article</button>

      <div v-if="publication && connected">
        <NewArticle
          :article="article"
          :cancelPublishRequest="cancelPublishRequest"
        />
      </div>

      <div v-if="showArticles && connected">
        <ShowArticles
          :user="user"
        />
      </div>

      <div v-if="searchArticle">
        <SearchArticle 
          :user="user"
        /> 
      </div>
    </div>

    <div v-else-if="charter">
      <Charter 
        :returnToMain="returnToMain"
      />
    </div>

    <div v-else>
      <h1>{{ article.title }}</h1>
      <p v-for="(paragraph, index) in article.content" :key="index" class="article-txt">{{ paragraph }}</p>
      <button @click="returnToMain">Retour</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NewArticle from '@/components/forum/NewArticle';
  import ShowArticles from '@/components/forum/ShowArticles';
  import SearchArticle from '@/components/forum/SearchArticle';
  import Charter from '@/components/forum/Charter';

  export default {
    name: 'Forum',
    components: {
      NewArticle,
      ShowArticles,
      SearchArticle,
      Charter
    },
    computed: {
      ...mapState(['user', 'connected', 'main', 'charter', 'article', 'publication', 'showArticles', 'searchArticle'])
    },
    methods: {
      ...mapActions(['connectUser', 'showUser', 'newPage', 'getCharter', 'newArticle', 'showUserArticles', 'readLatestArticles', 'findArticle', 'cancelPublishRequest', 'returnToMain']),
    },
    beforeMount() {
      if(localStorage.getItem('pseudo') !== null || sessionStorage.getItem('pseudo') !== null) {
        this.showUser();
        this.connectUser();
        this.newPage();
      } else {
        this.newPage();
      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.publication === true) {
        this.cancelPublishRequest()
          .then(result => {
            if(result) {
              next();
            } else {
              next(false);
            }
          });
      } else {
        next();
      }     
    }
  };
</script>

<style lang="scss">
.get-charter {
  font-style: italic;
  &--link {
    font-weight: 500;
    text-decoration: underline;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
}

.charter {
  text-align: justify;
  &--title {
    text-align: center;
  }
  &--list {
    padding-left: 15px;
  }
}

.forum-btn {
  font-size: 1rem;
  margin: 10px 20px;
  cursor: pointer;
}

.btnAdmin {
  font-size: 0.85rem;
  margin: 10px 20px;
  cursor: pointer;
  background: #ee0700;
}

.sharedArticle {
  &_title {
    font-size: 1rem;
    cursor: pointer;
    &--img {
      margin-right: 10px;
      -webkit-transform: translateY(20%);
              transform: translateY(20%);
    }
  }
}

.articles {
  margin: 40px;
}

.article-txt, .comment-txt {
  font-weight: 400;
  text-align: justify;
  .readMore {
    font-weight: 500;
    text-decoration: underline;
    &:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }
}

.comment-txt {
  margin: 0px;
}
</style>