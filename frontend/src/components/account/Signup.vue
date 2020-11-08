<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="nom">Nom :</label>
        <input type="text" v-model="lastName" maxlength="30" id="nom" @keyup="updateLastName">
      </div>
      <div class="form-div">
        <label for="prenom">Prénom :</label>
        <input type="text" v-model="firstName" maxlength="30" id="prenom" @keyup="updateFirstName">
      </div>
      <div class="form-div">
        <label for="email">E-mail :</label>
        <input type="text" v-model="email" maxlength="50" id="email" @keyup="updateEmail">
      </div>
      <div class="form-div">
        <label for="pseudo">Choisissez un pseudo :</label>
        <input type="text" v-model="pseudo" maxlength="20" id="pseudo" @keyup="updatePseudo">
      </div>
      <div class="form-div">
        <label for="password">Choisissez un mot de passe :</label>
        <input type="password" v-model="password" maxlength="20" id="password" @keyup="updatePassword">
      </div>
      <div class="form-div">
        <input type="checkbox" id="keepConnexion" @change="keepUserConnected">
        <label for="keepConnexion" class="keepConnexion">Rester connecté</label>
      </div>
      <div class="form-div">
        <input type="submit" value="Inscription" class="submit" @click.prevent="signup">
      </div>
      <button class="button" @click="registerUser">Déjà inscrit ?</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Signup',
    props: {
      signup: {
        type: Function,
        required: true
      },
      registerUser: {
        type: Function,
        required: true
      },
      keepUserConnected: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        lastName: '',
        firstName: '',
        email: '',
        pseudo: '',
        password: ''
      }
    },
    methods: {
      updateLastName() {
        this.$emit('updateLastName', this.lastName)
      },
      updateFirstName() {
        this.$emit('updateFirstName', this.firstName)
      },
      updateEmail() {
        this.$emit('updateEmail', this.email)
      },
      updatePseudo() {
        this.$emit('updatePseudo', this.pseudo);
      },
      updatePassword() {
        this.$emit('updatePassword', this.password);
      }
    }
  }
</script>