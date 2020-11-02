<template>
  <div class="home">
    <header>
      <img src="../assets/logo.png" alt="Groupomania Logo">
    </header>
    <main>
      <h1>Bienvenue dans votre nouveau réseau social</h1>
      <p class="texteAccueil">Suite à l'enquête que nous avons mené récemment, il est apparu que la plupart des salariés de l'entreprise souhaitaient une amélioration de l'ambiance entre collègues ainsi que plus d'échanges entre les différents départements.<br>Afin de répondre à vos attentes, nous avons décidé de mettre en place un réseau social interne, moderne et ludique, dans lequel vous pourrez écrire et/ou partager des articles avec vos collègues sur des sujets qui vous intéressent.</p>
      <p class="texteAccueil">Vous pourrez créer et vous connecter à votre compte grâce à la section <router-link to="/account">Mon Compte</router-link>.<br>Vous pourrez ensuite accéder au forum en vous rendant sur la section <router-link to="/forum">Forum</router-link>.</p>
      <p class="texteAccueil">Nous vous souhaitons une bonne navigation sur votre nouvelle application Groupomania !</p>
    </main>
    <footer class="footer">
      {{ copyright }}
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    computed: {
      copyright() {
        const currentYear = new Date().getFullYear();
        return `Copyright Groupomania ${currentYear}`;
      }
    }
  }
</script>

<style lang="scss">
.texteAccueil {
  text-align: justify;
  a {
    color: #d14454;
    &:hover {
      font-weight: 700;
    }
  }
}

.footer {
  font-weight: 400;
  margin-top: 50px;
  margin-bottom: 20px;
  font-style: italic;
}
</style>
