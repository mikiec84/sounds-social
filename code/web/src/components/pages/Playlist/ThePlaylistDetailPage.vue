<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <div v-if="!loading && !playlistDetail" v-text="$t('{{thing}} not found', { thing: $t('Playlist') })"></div>

      <div v-if="playlistDetail">
        <div class="gray b f2">
          <span v-text="$t('Playlist')"></span>
          <span class="light-red" v-text="`(${$t('Private')})`"></span>
        </div>
        <pure-title v-text="playlistDetail.name"></pure-title>

        <div v-if="playlistDetail.description" class="mt2 f3 gray mw5" v-text="playlistDetail.description"></div>

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
            <pure-button v-text="$t('Edit')"></pure-button>
          </div>
          <div v-if="playlistDetail.isRemovable" class="dib ml2 mt4">
            <pure-button color="red" v-text="$t('Remove')"></pure-button>
          </div>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script>
  import { playlistDetailQuery as query } from '../../../api/PlaylistApi'
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
    },
  }
</script>
