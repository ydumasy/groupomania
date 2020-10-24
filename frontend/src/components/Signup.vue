<template>
  <div>
    <form class="form">
      <div class="form-div">
        <label for="nom">Nom :</label>
        <input @keyup="updateLastName" v-model="lastName" id="nom" type="text" required>
      </div>
      <div class="form-div">
        <label for="prenom">Prénom :</label>
        <input @keyup="updateFirstName" v-model="firstName" id="prenom" type="text" required>
      </div>
      <div class="form-div">
        <label for="email">E-mail :</label>
        <input @keyup="updateEmail" v-model="email" id="email" type="text" required>
      </div>
      <div class="form-div">
        <label for="pseudo">Choisissez un pseudo :</label>
        <input @keyup="updatePseudo" v-model="pseudo" id="pseudo" type="text" required>
      </div>
      <div class="form-div">
        <label for="password">Choisissez un mot de passe :</label>
        <input @keyup="updatePassword" v-model="password" id="password" type="text" required>
      </div>
      <div class="form-div">
        <input @click="signup" type="submit" value="Inscription" class="submit">
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