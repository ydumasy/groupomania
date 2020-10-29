<template>
  <div class="home">
    <header>
      <img alt="Groupomania Logo" src="../assets/logo.png">
    </header>
    <main>
      <h1>Bienvenue dans votre nouveau réseau social</h1>
      <p class="texteAccueil">Suite à l'enquête que nous avons mené récemment, il est apparu que la plupart des salariés de l'entreprise souhaitaient une amélioration de l'ambiance entre collègues ainsi que plus d'échanges entre les différents départements.<br>Afin de répondre à vos attentes, nous avons décidé de mettre en place un réseau social interne, moderne et ludique, dans lequel vous pourrez écrire et/ou partager des articles avec vos collègues sur des sujets qui vous intéressent.</p>
      <p class="texteAccueil">Vous pourrez créer et vous connecter à votre compte grâce à la section "Mon Compte".<br>Vous pourrez ensuite accéder au forum en vous rendant sur la section "Forum".</p>
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
    color: #000;
    font-style: italic;
    &:hover {
      font-weight: 700;
    }
  }
}

.footer {
  margin-top: 50px;
  margin-bottom: 20px;
  font-style: italic;
}
</style>
