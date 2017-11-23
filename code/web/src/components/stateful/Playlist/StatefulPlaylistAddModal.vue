<template>
  <pure-modal @close="$emit('close')">
    <div class="pa4">
      <h2 class="f1 mv3" v-text="$t('Add to playlist')"></h2>

      <div class="cf" v-if="hasPlaylists">
        <div class="f5 mw5 fl w-50 pr3" v-for="playlist in playlistToAddList" :key="playlist._id">
          <div class="pointer white bg-dark-gray mb2 pv2 ph2 b" @click="addSound(playlist._id)">
            <div class="dib" v-text="playlist.name"></div>
            <div class="dib f6 light-red" v-if="!playlist.isPublic" v-text="`(${$t('Private')})`"></div>
            <div v-if="playlist.description" class="mt2 f7" v-text="playlist.description"></div>
          </div>
        </div>
      </div>

      <h3 class="f4 mv4 dark-gray" v-text="$t('Create new playlist')"></h3>


      <div class="cf">
        <div class="fl w-50">
          <pure-input @keyup="newPlaylistName = arguments[0]" :placeholder="$t('Playlist name')"></pure-input>
        </div>
        <div class="fl w-50 pl4">
          <pure-button @click="createPlaylist" v-text="$t('Save')"></pure-button>
        </div>
      </div>
    </div>
  </pure-modal>
</template>
<script>
  import { playlistToAddListQuery, createPlaylist, addSoundToPlaylist } from '../../../api/PlaylistApi'

  export default {
    props: {
      soundId: {
        type: String,
        required: false,
      },
    },
    data () {
      return {
        newPlaylistName: '',
      }
    },
    apollo: {
      playlistToAddList: {
        query: playlistToAddListQuery,
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
      },
    },
    computed: {
      hasPlaylists () {
        return this.playlistToAddList && this.playlistToAddList.length
      },
    },
    methods: {
      createPlaylist () {
        createPlaylist(this.newPlaylistName).then(({ data: { newPlaylist } }) => {
          this.newPlaylistName = ''
        })
      },
      addSound (playlistId) {
        addSoundToPlaylist(playlistId, this.soundId).then(({ data: { playlist } }) => {
          this.$router.push({ name: 'playlist-detail', params: { id: playlist._id } })
        })
      }
    },
  }
</script>
