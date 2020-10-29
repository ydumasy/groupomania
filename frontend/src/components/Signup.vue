<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="nom">Nom :</label>
        <input type="text" @keyup="updateLastName" v-model="lastName" id="nom" required>
      </div>
      <div class="form-div">
        <label for="prenom">Prénom :</label>
        <input type="text" @keyup="updateFirstName" v-model="firstName" id="prenom" required>
      </div>
      <div class="form-div">
        <label for="email">E-mail :</label>
        <input type="text" @keyup="updateEmail" v-model="email" id="email" required>
      </div>
      <div class="form-div">
        <label for="pseudo">Choisissez un pseudo :</label>
        <input type="text" @keyup="updatePseudo" v-model="pseudo" id="pseudo" required>
      </div>
      <div class="form-div">
        <label for="password">Choisissez un mot de passe :</label>
        <input type="text" @keyup="updatePassword" v-model="password" id="password" required>
      </div>
      <div class="form-div">
        <input type="checkbox" @change="keepUserConnected" id="keepConnexion">
        <label for="keepConnexion">Rester connecté</label>
      </div>
      <div class="form-div">
        <input type="submit" @click="signup" value="Inscription" class="submit">
      </div>
      <div v-if="msgError">
      <p class="error">Désolé, une erreur est survenue. Il est possible que vous utilisiez un pseudo ou une adresse mail déjà existants.</p>
      </div>
      <button @click="registerUser" class="button">Déjà inscrit ?</button>
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
      },
      msgError: {
        type: Boolean,
        default: false
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