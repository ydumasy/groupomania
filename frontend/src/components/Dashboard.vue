<template>
  <div>
    <p>Bonjour {{ pseudo }}, vous êtes désormais connecté.<br>Vous pouvez dès à présent vous rendre sur le forum afin d'échanger avec vos collègues en toute convivialité !</p>
    <button @click="disconnectUser" class="button">Déconnexion</button>
    <button @click="getDeleteRequest" class="button">Supprimer mon compte</button>
    <div v-if="deleteQuery">
      <form class="form">
        <div class="form-div">
          <label for="confirmPassword"  class="confirmPassword" >Par mesure de sécurité, veuillez saisir votre mot de passe :</label><br>
          <input type="text" @keyup='updatePassword' v-model="password" id="confirmPassword" class="confirmPassword" required><br>
          <input type="submit" @click="deleteUser" value="Confirmer la suppression" class="confirmPassword">
          <button @click="cancelDeleteRequest" class="button">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    props: {
      pseudo: {
        type: String,
        required: true
      },
      deleteQuery: {
        type: Boolean,
        default: false
      },
      disconnectUser: {
        type: Function,
        required: true
      },
      getDeleteRequest: {
        type: Function,
        required: true
      },
      cancelDeleteRequest: {
        type: Function,
        required: true
      },
      deleteUser: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        password: ''
      }
    },
    methods: {
      updatePassword() {
        this.$emit('updatePassword', this.password);
      }
    }
  }
</script>