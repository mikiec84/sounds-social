<template>
  <div>
    <div class="shadow-1">
    <header-component :active-item-id="current" @logout="authLogOut"></header-component>
    </div>
      <stateful-sound-player></stateful-sound-player>
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
