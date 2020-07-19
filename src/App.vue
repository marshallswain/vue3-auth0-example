<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <button v-if="$auth0.state.isAuthenticated" type="button" @click="logout">Logout</button>
      <button v-else type="button" @click="login">Login</button>
    </div>
    <div v-if="$auth0.state.isAuthenticated">
      Welcome, {{ $auth0.state.user.given_name || $auth0.state.user.email }}!
    </div>
    <router-view />
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'App',
  setup(props, context) {
    function login() {
      this.$auth0.client.loginWithRedirect({
        appState: { targetUrl: window.location.href }
      })
    }
    function logout() {
      this.$auth0.client.logout({ redirect_uri: window.location.href })
    }

    return { login, logout }
  }
}
</script>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  @apply text-gray-600
}

#nav a.router-link-exact-active {
  @apply text-green-300;
}
</style>
