<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <div v-if="!loading && !playlistDetail" v-text="$t('{{thing}} not found', { thing: $t('Playlist') })"></div>

      <div v-if="playlistDetail">
        <div class="gray b f2">
          <span v-text="`${$t('Playlist')} ${$t('by')}`"></span>
          <router-link
            class="color-inherit no-underline"
            :to="{ name: 'profile-detail', params: { id: playlistDetail.creator._id }}"
            v-text="playlistDetail.creator.username"></router-link>
          <span v-if="!playlistDetail.isPublic" class="light-red" v-text="`(${$t('Private')})`"></span>
        </div>
        <pure-title v-text="playlistDetail.name"></pure-title>

        <div v-if="playlistDetail.description" class="mt0 f4 fw6 gray lh-title" style="max-width: 600px" v-text="playlistDetail.description"></div>

        <div class="mt3">
          <stateful-sound-list :query="playlistSoundsQuery"
                               :defineQueryVariables="defineQueryVariables"></stateful-sound-list>
        </div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="playlistDetail">
        <pure-profile-box
          :user="playlistDetail.creator"
        ></pure-profile-box>

        <div class="tc">
          <div v-if="playlistDetail.isEditable" class="dib mt4">
            <pure-button v-text="$t('Edit')"
                         @click="$router.push({ name: 'playlist-edit', params: { id: playlistDetail._id } })"></pure-button>
          </div>
          <div v-if="playlistDetail.isRemovable" class="dib ml2 mt4">
            <pure-confirm-modal-button @confirm="removePlaylist" buttonColor="red">
              <div slot="button" v-text="$t('Remove')">Remove</div>
              <div slot="modal" v-text="$t('Do you really want to delete this?')"></div>
            </pure-confirm-modal-button>
          </div>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script>
  import { playlistDetailQuery as query, removePlaylist } from '../../../api/PlaylistApi'
  import { playlistSoundsQuery } from '../../../api/SoundApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import StatefulSoundList from '../../stateful/sound/StatefulSoundList.vue'

  export default {
    components: { HeaderComponent, StatefulSoundList },
    data () {
      return {
        loading: 0,
        playlistSoundsQuery,
      }
    },

    metaInfo () {
      if (!this.playlistDetail) {
        return {}
      }

      return {
        title: `${this.playlistDetail.name} ${this.$t('by')} ${this.playlistDetail.creator.username}`,
      }
    },
    apollo: {
      playlistDetail: {
        query,
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        variables () {
          return { id: this.playlistId }
        },
      },
    },
    computed: {
      playlistId () {
        return this.$route.params.id
      },
    },
    methods: {
      defineQueryVariables () {
        return {
          playlistId: this.playlistId,
        }
      },
      removePlaylist () {
        removePlaylist(this.playlistId).then(({ data: { playlist } }) => {
          this.$router.push({ name: 'profile-detail', params: { id: 'me' } })
        })
      },
    },
  }
</script>
