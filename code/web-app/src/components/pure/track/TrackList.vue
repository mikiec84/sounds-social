<template>
  <div>
    <div v-for="(track, index) in tracks" :class="{ 'mt3': index !== 0  }">
      <track-component
              :timeAgo="track.timeAgo"
              :label="track.label"
              :username="track.username"
              @open-profile="$emit('open-profile', track)"
              @open-track="$emit('open-track', track)"
              :fileUrl="track.fileUrl"></track-component>
    </div>
  </div>
</template>
<script>
  import TrackComponent from './Track.vue'

  export default {
    props: {
      tracks: {
        type: Array,
        required: true,
      },
    },
    components: { TrackComponent },
  }
</script>
