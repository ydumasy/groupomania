<template>
  <div class="account">
    <div v-if="registered && connected">Bonjour {{ pseudo }}, vous êtes désormais connecté.<br>Vous pouvez dès à présent vous rendre sur le forum afin d'échanger avec vos collègues en toute convivialité !</div>
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
      <button @click="newUser" class="new-user">Je m'inscris</button>
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
        </form>
    </div>
  </div>
</template>

<script>
  import axios from '@/axios.js';

  export default {
    name: 'Account',
    data() {
      return {
        pseudo: '',
        connected: false,
        registered: true,
        userSignup: {
          firstName: '',
          lastName: '',
          email: '',
          pseudo: '',
          password: ''
        },
        userLogin: {
          pseudo: '',
          password: ''
        }
      }
    },
    methods: {
      newUser() {
        this.registered = false;
      },
      signup() {
        this.pseudo = this.userSignup.pseudo;
        axios.post('/users/signup', this.userSignup)
          .then(response => console.log(response))
          .catch(error => console.log(error));
        this.registered = true;
        this.connected = true;
      },
      login() {
        this.pseudo = this.userLogin.pseudo;
        axios.post('/users/login', this.userLogin)
          .then(response => console.log(response))
          .catch(error => console.log(error));
        this.connected = true;
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
.new-user {
  font-size: 1rem;
  cursor: pointer;
}
</style>