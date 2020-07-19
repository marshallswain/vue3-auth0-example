// Must be imported before vue-router, since vue-router clears window.location.search
import { setupAuth0, auth0Plugin } from './plugins/auth0.js'
import { createApp } from 'vue'
import App from './App.vue'
import AppLoading from './AppLoading.vue'
import { setupRouter } from './router/index.js'
import './index.postcss'

// const audience = import.meta.env.VITE_API_URL
const domain = import.meta.env.VITE_AUTH_DOMAIN
const client_id = import.meta.env.VITE_AUTH_CLIENT_ID

// Mount the loading scren
createApp(AppLoading)
  .use(auth0Plugin)
  .mount('#app-loading')

// Setup Auth0 then mount the app.
setupAuth0({ domain, client_id }).then(async () => {
  const router = setupRouter()
  createApp(App)
    .use(auth0Plugin)
    .use(router)
    // .use(store)
    .mount('#app')
})