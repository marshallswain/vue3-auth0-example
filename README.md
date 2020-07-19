# Using Vue3 with Auth0

This repo demonstrates how to get Auth0 auth running in VueJS 3.0 application and `createWebHashHistory`.

The primary challenge with getting this to work comes from working with `vue-router-next` (currently `4.0.0-beta.2`).  `vue-router-next` has two type of history options built in:

- `createWebHistory` uses pushState routing
- `createWebHashHistory` uses hash-based routing `/#/`

The challenge (which is likely a bug) is that when using web hash history, the `search` part of the url is removed from the URL.  This happens upon using `import` on the `vue-router` package.  This makes it challenging for the Auth0 client library to access the `code` and `state` params from the OAuth callback URL. At least, not without doing a decent workaround.

The workaround to get web hash history working with Auth0 client library was to 

1. Make sure the `plugins/auth0.js` file was imported before `vue-router` and 
2. Move the call to `createApp` after the promise resolves when creating the Auth0 client.
3. To complete the experience and show a loading state, create a separate "app-loading" application which hides itself once authentication checks are complete and the primary app is ready.

This appears to be a bug, since when using `createWebHistory` (no hash) the `search` part of the URL is included in the return value here: https://github.com/vuejs/vue-router-next/blob/master/src/history/html5.ts#L51.