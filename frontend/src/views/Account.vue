<template>
  <div class="account">
    <div v-if="registered && connected">
      <Dashboard
        :user="user"
      />
    </div>
    <div v-else-if="registered && !connected">
      <Login
        :user="user"
        :keepUserConnected="keepUserConnected"
      />
    </div>
    <div v-else>
      <Signup
        :user="user"
        :keepUserConnected="keepUserConnected"
      />
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import Dashboard from '@/components/account/Dashboard';
  import Login from '@/components/account/Login';
  import Signup from '@/components/account/Signup';

  export default {
    name: 'Account',
    components: {
      Dashboard,
      Login,
      Signup
    },
    computed: {
      ...mapState(['user', 'connected', 'registered'])
    },
    methods: {
      ...mapActions(['connectUser', 'keepUserConnected', 'showUser']),
    },
    beforeMount() {
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
  .validate {
    cursor: pointer;
  }
}

.error {
  font-size: 0.85rem;
}

.info {
  font-size: 0.75rem;
  font-style: italic;
  width: 30%;
  margin: 10px auto;
}
</style>