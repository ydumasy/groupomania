<template>
  <div class="account">
    <div v-if="registered && connected">Bonjour {{ pseudo }}, vous êtes désormais connecté.<br>Vous pouvez dès à présent vous rendre sur le forum afin d'échanger avec vos collègues en toute convivialité !</div>
    <div v-else-if="registered && !connected">
      <form class="form">
        <div class="form-div">
          <label for="pseudo">Pseudo :</label>
          <input id="pseudo" type="text">
        </div>
        <div class="form-div">
          <label for="password">Mot de passe :</label>
          <input id="password" type="text">
        </div>
        <div class="form-div">
          <input type="submit" value="Connexion" class="submit">
        </div>
      </form>
      <p>Pas encore inscrit ? Cliquez sur le bouton ci-dessous</p>
      <button class="signup" @click="signup">Je m'inscris</button>
    </div>
    <div v-else>
      <form class="form">
        <div class="form-div">
            <label for="nom">Nom :</label>
            <input id="nom" type="text">
          </div>
          <div class="form-div">
            <label for="prenom">Prénom :</label>
            <input id="prenom" type="text">
          </div>
          <div class="form-div">
            <label for="email">E-mail :</label>
            <input id="email" type="text">
          </div>
          <div class="form-div">
            <label for="chosenPseudo">Choisissez un pseudo :</label>
            <input id="chosenPseudo" type="text">
          </div>
          <div class="form-div">
            <label for="chosenPassword">Choisissez un mot de passe :</label>
            <input id="chosenPassword" type="text">
          </div>
          <div class="form-div">
            <input type="submit" value="Inscription" class="submit">
          </div>
        </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Account',
    data() {
      return {
        pseudo: '',
        connected: false,
        registered: true
      }
    },
    methods: {
      signup() {
        this.registered = false;
      }
    }
  }
</script>

<style lang="scss">
.form {
  margin-bottom: 50px;
}
.form-div {
  margin: 20px;
  & label {
    display: inline-block;
    width: 130px;
  }
  & .submit {
    font-size: 1rem;
    cursor: pointer;
  }
}
.signup {
  font-size: 1rem;
  cursor: pointer;
}
</style>