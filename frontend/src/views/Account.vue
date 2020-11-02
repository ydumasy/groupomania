<template>
  <div class="account">
    <div v-if="registered && connected">
      <Dashboard
        :pseudo="user.pseudo"
        :deleteQuery="deleteQuery"
        :disconnectUser="disconnectUser"
        :getDeleteRequest="getDeleteRequest"
        :cancelDeleteRequest="cancelDeleteRequest"
        :deleteUser="deleteUser"
        @updatePassword="setPassword"
      />
    </div>
    <div v-else-if="registered && !connected">
      <Login
        :login="login"
        :unregisterUser="unregisterUser"
        :keepUserConnected="keepUserConnected"
        @updatePseudo="setPseudo"
        @updatePassword="setPassword"
      />
    </div>
    <div v-else>
      <Signup
        :signup="signup"
        :registerUser="registerUser"
        :keepUserConnected="keepUserConnected"
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
  import Dashboard from '@/components/account/Dashboard.vue';
  import Login from '@/components/account/Login.vue';
  import Signup from '@/components/account/Signup.vue';

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
      ...mapActions(['registerUser', 'unregisterUser', 'connectUser', 'disconnectUser', 'showUser', 'keepUserConnected', 'getDeleteRequest','cancelDeleteRequest', 'deleteUser', 'signup', 'login']),
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
      this.cancelDeleteRequest();
      if(localStorage.getItem('pseudo') !== null || sessionStorage.getItem('pseudo') !== null) {
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
  .confirmPassword {
    display: inline;
    margin-top: 10px;
  }
}

.error {
  font-size: 0.85rem;
}
</style>