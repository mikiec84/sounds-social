<template>
  <div>
    <div class="shadow-1">
    <header-component
      :active-item-id="current"
      :is-logged-in="userIsAuthenticated"
      @logout="authLogOut"></header-component>
    </div>
      <stateful-sound-player
        @openSound="$router.push({ name: 'sound-detail', params: { id: arguments[0] } })"
        @openProfile="$router.push({ name: 'profile-detail', params: { id: arguments[0] } })"
      ></stateful-sound-player>
  </div>
</template>
<script>
  import StatefulSoundPlayer from './track/StatefulSoundPlayer.vue'
  export default {
    components: { StatefulSoundPlayer },
    props: {
      current: {
        type: String,
        required: true,
      },
    },
  }
</script>
