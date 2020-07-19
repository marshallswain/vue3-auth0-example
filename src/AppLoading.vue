<template>
  <div
    v-if="$auth0.state.isLoading"
    class="h-full flex items-center justify-center bg-blue-500 text-white"
  >
    Loading
  </div>
</template>

<script>
import { watch } from 'vue'
import { $auth0 } from './plugins/auth0.js'

export default {
  name: 'Loading',
  setup(props, context) {
    watch(
      () => $auth0.state.isLoading,
      isLoading => {
        document.getElementById('app-loading').remove()
      }
    )
  }
}
</script>

<style lang="postcss"></style>
