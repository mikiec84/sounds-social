<template>
  <div>
    <div v-for="(track, index) in tracks" :key="track._id" :class="{ 'mt3': index !== 0  }">
      <track-component
              :timeAgo="track.timeAgo"
              :label="track.label"
              :username="track.username"
              @open-profile="$emit('open-profile', track)"
              @open-track="$emit('open-track', track)"
              :inListView="true"
              :coverFileUrl="$_fp.get('coverFile.url')(track)"
              :fileUrl="$_fp.get('file.url')(track)"></track-component>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      tracks: {
        type: Array,
        required: true,
      },
    },
  }
</script>
