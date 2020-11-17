<template>
  <div>
    <p>Bonjour {{ user.pseudo }}, vous êtes désormais connecté.<br>Vous pouvez dès à présent vous rendre sur le forum afin d'échanger avec vos collègues en toute convivialité !</p>
    <button @click="disconnectUser" class="button">Déconnexion</button>
    <button @click="getDeleteRequest" class="button">Supprimer mon compte</button>
    <div v-if="deleteQuery">
      <form class="form">
        <div class="form-div">
          <label for="confirmPassword"  class="confirmPassword" >Par mesure de sécurité, veuillez saisir votre mot de passe :</label><br>
          <input type="password" v-model="user.password" maxlength="20" id="confirmPassword" class="confirmPassword"><br>
          <input type="submit" value="Confirmer la suppression" class="validate" @click.prevent="deleteUser">
          <button class="button" @click="cancelDeleteRequest">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'; 

  export default {
    name: 'Dashboard',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        deleteQuery: false
      }
    },
    methods: {
      ...mapActions(['disconnectUser', 'deleteUser']),
      getDeleteRequest() {
        this.deleteQuery = true;
      },
      cancelDeleteRequest() {
        this.deleteQuery = false;
      }
    }
  }
</script>