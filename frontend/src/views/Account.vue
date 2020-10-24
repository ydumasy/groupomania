<template>
  <div class="account">
    <div v-if="registered && connected">
      <p>Bonjour {{ userLogin.pseudo }}, vous êtes désormais connecté.<br>Vous pouvez dès à présent vous rendre sur le forum afin d'échanger avec vos collègues en toute convivialité !</p>
      <button @click="disconnectUser" class="button">Déconnexion</button>
      <button @click="deleteRequest" class="button">Supprimer mon compte</button>
      <div v-if="deleteQuery">
        <form class="form">
          <div class="form-div">
            <label for="confirmPassword"  class="confirmPassword" >Par mesure de sécurité, veuillez saisir votre mot de passe :</label><br>
            <input v-model="userLogin.password" id="confirmPassword" class="confirmPassword" type="text" required><br>
            <input @click="deleteUser" type="submit" value="Confirmer la suppression" class="submit confirmPassword">
          </div>
        </form>
      </div>
    </div>
    <div v-else-if="registered && !connected">
      <form class="form">
        <div class="form-div">
          <label for="pseudo">Pseudo :</label>
          <input v-model="userLogin.pseudo" id="pseudo" type="text" required>
        </div>
        <div class="form-div">
          <label for="password">Mot de passe :</label>
          <input v-model="userLogin.password" id="password" type="text" required>
        </div>
        <div class="form-div">
          <input @click="login" type="submit" value="Connexion" class="submit">
        </div>
      </form>
      <p>Pas encore inscrit ? Cliquez sur le bouton ci-dessous</p>
      <button @click="unregisterUser" class="button">Je m'inscris</button>
    </div>
    <div v-else>
      <form class="form">
        <div class="form-div">
            <label for="nom">Nom :</label>
            <input v-model="userSignup.lastName" id="nom" type="text" required>
          </div>
          <div class="form-div">
            <label for="prenom">Prénom :</label>
            <input v-model="userSignup.firstName" id="prenom" type="text" required>
          </div>
          <div class="form-div">
            <label for="email">E-mail :</label>
            <input v-model="userSignup.email" id="email" type="text" required>
          </div>
          <div class="form-div">
            <label for="chosenPseudo">Choisissez un pseudo :</label>
            <input v-model="userSignup.pseudo" id="chosenPseudo" type="text" required>
          </div>
          <div class="form-div">
            <label for="chosenPassword">Choisissez un mot de passe :</label>
            <input v-model="userSignup.password" id="chosenPassword" type="text" required>
          </div>
          <div class="form-div">
            <input @click="signup" type="submit" value="Inscription" class="submit">
          </div>
          <button @click="registerUser" class="button">Déjà inscrit ?</button>
        </form>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'Account',
    computed: {
      ...mapState(['userLogin', 'userSignup', 'registered', 'connected', 'deleteQuery'])
    },
    methods: {
      ...mapActions(['registerUser', 'unregisterUser', 'connectUser', 'disconnectUser', 'showUser', 'deleteRequest','deleteUser', 'signup', 'login']),
    },
    beforeMount() {
      if(localStorage.getItem('pseudo') !== null) {
        this.showUser();
        this.connectUser();
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
  & .confirmPassword {
    display: inline;
    margin-top: 10px;
  }
  & .submit {
    font-size: 1rem;
    cursor: pointer;
  }
}

.button {
  font-size: 0.85rem;
  margin: 20px;
  cursor: pointer;
}
</style>