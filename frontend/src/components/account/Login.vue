<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="pseudo">Pseudo :</label>
        <input type="text" v-model="user.pseudo" maxlength="20" id="pseudo">
      </div>
      <div class="form-div">
        <label for="password">Mot de passe :</label>
        <input type="password" v-model="user.password" maxlength="20" id="password">
      </div>
      <div class="form-div">
        <input type="checkbox" @change="keepUserConnected" id="keepConnexion">
        <label for="keepConnexion" class="keepConnexion">Rester connecté</label>
      </div>
      <div class="form-div">
        <input type="submit" value="Connexion" class="submit" @click.prevent="login">
      </div>
    </form>
    <p>Pas encore inscrit ? Cliquez sur le bouton ci-dessous</p>
    <button @click="getSignup">Je m'inscris</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Login',
    props: {
      user: {
        type: Object,
        required: true
      },
      keepUserConnected: {
        type: Function,
        required: true
      }
    },
    methods: {
      ...mapActions(['getSignup', 'login'])
    }
  }
</script>