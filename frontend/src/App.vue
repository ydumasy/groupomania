<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/account">Mon Compte</router-link> |
      <router-link to="/forum">Forum</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
* {
  background: #122442;
}

button, input, textarea {
  background: #d14454;
  color: #fff;
}

button {
  padding: 5px;
}

#app {
  font-family: Montserrat, sans-serif;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFF;
}

#nav {
  padding: 30px;

  a {
    font-weight: 700;
    color: #d14454;

    &.router-link-exact-active {
      color: #fff;
    }
  }
}

.form-div {
  margin: 20px;
  label {
    display: inline-block;
    width: 170px;
    &.keepConnexion {
      text-align: left;
      margin-left: 10px;
    }
  }
  .submit {
    font-size: 1rem;
    cursor: pointer;
    padding: 5px;
  }
}

.button {
  font-size: 0.85rem;
  margin: 20px;
  cursor: pointer;
}
</style>
