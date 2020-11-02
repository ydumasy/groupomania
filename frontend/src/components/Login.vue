<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="pseudo">Pseudo :</label>
        <input type="text" v-model="pseudo" maxlength="20" id="pseudo" @keyup="updatePseudo">
      </div>
      <div class="form-div">
        <label for="password">Mot de passe :</label>
        <input type="text" v-model="password" maxlength="20" id="password" @keyup="updatePassword">
      </div>
      <div class="form-div">
        <input type="checkbox" @change="keepUserConnected" id="keepConnexion">
        <label for="keepConnexion" class="keepConnexion">Rester connecté</label>
      </div>
      <div class="form-div">
        <input type="submit" value="Connexion" class="submit" @click="login">
      </div>
    </form>
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