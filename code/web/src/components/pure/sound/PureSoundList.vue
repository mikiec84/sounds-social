<template>
  <div>
    <div v-for="(track, index) in tracks" :key="track._id" :class="{ 'mt3': index !== 0  }">
      <sound-component
              :timeAgo="track.timeAgo"
              :label="track.label"
              :username="track.username"
              @open-profile="$emit('open-profile', track)"
              @open-track="$emit('open-track', track)"
              @play-track="$emit('play-track', track)"
              :inListView="true"
              :coverFileUrl="getCoverImage(track)"
              :fileUrl="$_fp.get('file.url')(track)"></sound-component>
    </div>
  </div>
</template>
<script>
  import { getImage } from '../../../func/getImage'

  export default {
    props: {
      tracks: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getCoverImage (track) {
        return getImage('coverFile.url')(track)
      },
    },
  }
</script>
