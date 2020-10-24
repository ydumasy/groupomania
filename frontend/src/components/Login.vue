<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="pseudo">Pseudo :</label>
        <input @keyup="updatePseudo" v-model="pseudo" id="pseudo" type="text" required>
      </div>
      <div class="form-div">
        <label for="password">Mot de passe :</label>
        <input @keyup="updatePassword" v-model="password" id="password" type="text" required>
      </div>
      <div class="form-div">
        <input @click="login" type="submit" value="Connexion" class="submit">
      </div>
    </form>
    <p>Pas encore inscrit ? Cliquez sur le bouton ci-dessous</p>
    <button @click="unregisterUser" class="button">Je m'inscris</button>
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