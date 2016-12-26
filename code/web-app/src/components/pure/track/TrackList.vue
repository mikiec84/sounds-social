<template>
  <div>
    <div v-for="(track, index) in tracks" :class="{ 'mt3': index !== 0  }">
      <track-component
              :time-ago="track.timeAgo"
              :label="track.label"
              :username="track.username"
              @open-profile="console.log('open profile')"
              @open-track="console.log('open track')"
              :waveform-src="track.waveformSrc"></track-component>
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
