<template>
  <div>
    <div v-for="(sound, index) in sounds" :key="sound._id" :class="{ 'mt3': index !== 0  }">
      <sound-component
              :timeAgo="sound.timeAgo"
              :label="sound.label"
              :username="sound.username"
              @open-profile="$emit('open-profile', sound)"
              @open-sound="$emit('open-sound', sound)"
              @play-sound="$emit('play-sound', sound)"
              :inListView="true"
              :isPrivate="sound.isPrivate"
              :coverFileUrl="getSoundCoverImage(sound)"
              :fileUrl="$_fp.get('file.url')(sound)"></sound-component>
    </div>
  </div>
</template>
<script>
  import { getSoundCoverImage } from '../../../func/getImage'

  export default {
    props: {
      sounds: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getCoverImage (sound) {
        return getSoundCoverImage(sound)
      },
    },
  }
</script>
