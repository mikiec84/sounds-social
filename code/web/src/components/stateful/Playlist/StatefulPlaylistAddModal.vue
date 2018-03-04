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
          <pure-input :value="newPlaylistName"
                      @keyup="changePlaylistName(arguments[0])" :placeholder="$t('Playlist name')"></pure-input>
        </div>
        <div class="fl w-50 pl4">
          <pure-button @click="createPlaylist" :disabled="$v.$invalid" v-text="$t('Save')"></pure-button>
        </div>
      </div>

      <div class="mt3" v-if="$v.newPlaylistName.$error">
        <pure-error v-if="!$v.newPlaylistName.required"
                    v-text="$t('{{thing}} cannot be empty', { thing: $t('Name') })"
        ></pure-error>
        <pure-error v-if="!$v.newPlaylistName.minLength"
                    v-text="$t('{{thing}} must be longer', { thing: $t('Name') })"
        ></pure-error>
        <pure-error v-if="!$v.newPlaylistName.maxLength"
                    v-text="$t('{{thing}} must be shorter', { thing: $t('Name') })"
        ></pure-error>
      </div>
    </div>
  </pure-modal>
</template>
<script>
  import { debounce } from 'lodash/fp'
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
  import { playlistToAddListQuery, createPlaylist, addSoundToPlaylist } from '../../../api/PlaylistApi'

  const checkNameSlow = debounce(200)((name, scope) => {
    scope.$v.newPlaylistName.$touch()
  })

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
    validations: {
      newPlaylistName: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },
    },
    methods: {
      changePlaylistName (name) {
        this.newPlaylistName = name
        checkNameSlow(name, this)
      },
      createPlaylist () {
        createPlaylist(this.newPlaylistName).then(({ data: { newPlaylist } }) => {
          this.newPlaylistName = ''
          this.$v.newPlaylistName.$reset()

          this.addSound(newPlaylist._id)
        })
      },
      addSound (playlistId) {
        addSoundToPlaylist(playlistId, this.soundId).then(({ data: { playlist } }) => {
          this.openPlaylistDetail(playlist._id)
        })
      },
      openPlaylistDetail (playlistId) {
        this.$router.push({ name: 'playlist-detail', params: { id: playlistId } })
      },
    },
  }
</script>
