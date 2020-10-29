<template>
  <div class="forum">
    <p>Bienvenue sur le Forum ! Ici, vous pouvez écrire et/ou partager avec vos collègues des articles sur des sujets qui vous intéressent.</p>
    <button class="forum-btn">Publier un article</button>
    <button class="forum-btn">Lire les derniers articles</button>
  </div>
</template>

<script>
  export default {
    name: 'Forum'
  };
</script>

<style lang="scss">
.forum-btn {
  font-size: 1rem;
  margin: 10px 20px;
}
</style>