<template>
  <div class="account">
    <div v-if="registered && connected">
      <Dashboard
        :pseudo="user.pseudo"
        :deleteQuery="deleteQuery"
        :disconnectUser="disconnectUser"
        :deleteRequest="deleteRequest"
        :cancelRequest="cancelRequest"
        :deleteUser="deleteUser"
        @updatePassword="setPassword"
      />
    </div>
    <div v-else-if="registered && !connected">
      <Login
        :login="login"
        :unregisterUser="unregisterUser"
        @updatePseudo="setPseudo"
        @updatePassword="setPassword"
      />
    </div>
    <div v-else>
      <Signup
        :signup="signup"
        :registerUser="registerUser"
        @updateLastName="setLastName"
        @updateFirstName="setFirstName"
        @updateEmail="setEmail"
        @updatePseudo="setPseudo"
        @updatePassword="setPassword"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Dashboard from '@/components/Dashboard.vue';
  import Login from '@/components/Login.vue';
  import Signup from '@/components/Signup.vue';

  export default {
    name: 'Account',
    components: {
      Dashboard,
      Login,
      Signup
    },
    computed: {
      ...mapState(['user', 'registered', 'connected', 'deleteQuery'])
    },
    methods: {
      ...mapActions(['registerUser', 'unregisterUser', 'connectUser', 'disconnectUser', 'showUser', 'deleteRequest','cancelRequest', 'deleteUser', 'signup', 'login']),
      setLastName(lastName) {
        this.user.lastName = lastName;
      },
      setFirstName(firstName) {
        this.user.firstName = firstName;
      },
      setEmail(email) {
        this.user.email = email;
      },
      setPseudo(pseudo) {
        this.user.pseudo = pseudo;
      },
      setPassword(password) {
        this.user.password = password;
      }
    },
    beforeMount() {
      this.cancelRequest();
      if(localStorage.getItem('pseudo') !== null) {
        this.showUser();
        this.connectUser();
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
  & .confirmPassword {
    display: inline;
    margin-top: 10px;
  }
  & .submit {
    font-size: 1rem;
    cursor: pointer;
  }
}

.button {
  font-size: 0.85rem;
  margin: 20px;
  cursor: pointer;
}
</style>