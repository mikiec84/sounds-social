<template>
  <div>
    <div v-if="isAuthenticated">
      <feed-component></feed-component>
    </div>

    <div v-if="!isAuthenticated">
      <div class="bg-dark-blue white">
        <h1 class="f-headline lh-copy tc ma0 pv5">Sound Social</h1>
        <div class="mw8 center">
          <div class="lh-copy f3 ph3 pv4 tc">Join the community of artists and so on! Also get a better description</div>
        </div>
      </div>

      <div class="mw8 center tc">
        <div class="pv4">
          <button-component @click="authLogIn()">Login</button-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import FeedComponent from './home/FeedPage.vue'
  import ButtonComponent from '../pure/Button.vue'

  export default {
    components: { FeedComponent, ButtonComponent },
  }
</script>
