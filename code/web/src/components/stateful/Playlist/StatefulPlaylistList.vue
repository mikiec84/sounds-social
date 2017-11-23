<template>
  <div>
    <h2 class="mt5 mb3 f3" v-text="$t('Playlists')"></h2>
    <div v-for="playlist in playlistList" class="pa2 ba bw1 b--light-gray mb2 pointer" @click="openPlaylist(playlist)">
      <div class="dib v-mid cover"
           :style="`width: 50px; height: 50px; background-image: url(${getPlaylistImage(playlist)})`"></div>
      <div class="dib v-mid f5 ml3" v-text="playlist.name"></div>
    </div>
  </div>
</template>
<script>
  import { playlistListQuery as query } from '../../../api/PlaylistApi'
  import { getImage } from '../../../func/getImage'

  export default {
    props: {
      userId: {
        type: String,
        required: true,
      },
    },
    apollo: {
      playlistList: {
        query,
        fetchPolicy: 'network-only',
        variables () {
          return { id: this.profileUserId }
        },
      },
    },
    methods: {
      getPlaylistImage (playlist) {
        return getImage('image.url')(playlist)
      },
      openPlaylist (playlist) {

      },
    },
  }
</script>
