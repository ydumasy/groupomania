<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="pseudo">Pseudo :</label>
        <input type="text"  @keyup="updatePseudo" v-model="pseudo" id="pseudo" required>
      </div>
      <div class="form-div">
        <label for="password">Mot de passe :</label>
        <input type="text" @keyup="updatePassword" v-model="password" id="password" required>
      </div>
      <div class="form-div">
        <input type="checkbox" @change="keepUserConnected" id="keepConnexion">
        <label for="keepConnexion">Rester connecté</label>
      </div>
      <div class="form-div">
        <input type="submit" @click="login" value="Connexion" class="submit">
      </div>
    </form>
    <div v-if="msgError">
      <p class="error">Désolé, une erreur est survenue. Veuillez vérifier votre pseudo et votre mot de passe.</p>
    </div>
    <p>Pas encore inscrit ? Cliquez sur le bouton ci-dessous</p>
    <button @click="unregisterUser">Je m'inscris</button>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    props: {
      login: {
        type: Function, 
        required: true
      },
      unregisterUser: {
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
        pseudo: '',
        password: ''
      }
    },
    methods: {
      updatePseudo() {
        this.$emit('updatePseudo', this.pseudo);
      },
      updatePassword() {
        this.$emit('updatePassword', this.password);
      }
    }
  }
</script>