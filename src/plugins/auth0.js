import { reactive, watch } from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'

export const $auth0 = reactive({
  client: null,
  state: {
    isLoading: true,
    isAuthenticated: false,
    error: null,
    user: null
  }
})

/** Returns the current instance of the SDK */
export const getClient = () => auth0Client

export async function setupAuth0({ domain, client_id }) {
  $auth0.client = await createAuth0Client({
    domain,
    client_id,
    redirect_uri: window.location.origin
    // audience: options.audience
  })
  const search = window.location.search
  const comingFromRedirect = search.includes('code=') && search.includes('state=')
  try {
    // If the user is returning to the app after auth success with Auth0.
    if (comingFromRedirect) {
      // handle the redirect and retrieve tokens
      const { appState } = await $auth0.client.handleRedirectCallback()
    }
  } catch (e) {
    $auth0.state.error = e
  } finally {
    // Initialize authentication state
    $auth0.state.isAuthenticated = await $auth0.client.isAuthenticated()
    $auth0.state.user = await $auth0.client.getUser()
    $auth0.state.isLoading = false
  }
}

/**
 * A Vue plugin to expose the wrapper object throughout the application.
 * The Auth0 client is available as $auth0.client.
 */
export const Auth0Plugin = {
  install(app, options) {
    app.config.globalProperties.$auth0 = $auth0
  }
}

export function auth0Plugin(app) {
  app.use(Auth0Plugin)
}

/**
 * Storage provider for the FeathersJS Authentication Client.
 * The getItem and setItem are not needed, but have to be stubbed out to prevent errors.
 */
export const storage = {
  async getItem() {
    let token

    try {
      token = await instance.getTokenSilently()
    } catch (error) {
      token = ''
    }
    return token
  },
  setItem() {},
  removeItem() {}
}
