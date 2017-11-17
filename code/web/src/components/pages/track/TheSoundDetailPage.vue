<template>
  <div v-if="!loading">
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="getTrack">
          <sound-component
                  :timeAgo="getTrack.createdAt"
                  :label="getTrack.name"
                  :coverFileUrl="$_fp.get('coverFile.url')(getTrack)"
                  :description="getTrack.description"
                  :username="getTrack.creator.username"
                  @open-profile="$router.push({ name: 'profile-detail', params: { id: getTrack.creator._id } })"
                  @open-track="playTrack"
                  @play-track="playTrack"
                  @pauseTrack="pauseTrack"
                  @seekSound="seekSound"
                  :noBorder="true"
                  :fileUrl="$_fp.get('file.url')(getTrack)"
                  :playingPos="playingPos"
                  :isPlaying="isPlaying"
                  :waveformSeek="isPlaying ? $store.getters.seekRelativeDecimal : 0">
            <div slot="metadata">
              <div class="gray f6"><span v-text="getTrack.playsCount"></span> <pure-icon icon="play-circle"></pure-icon></div>
            </div>
          </sound-component>

          <div class="ph3">
            <div class="mt4">
              <div class="dib mr2-l pb2 pb0-l">
                <pure-button @click="playNext" v-text="$t('Play next')"></pure-button>
              </div>
              <div class="dib mr2-l pb2 pb0-l">
                <pure-button @click="addToSoundPlayer" v-text="$t('Play later')"></pure-button>
              </div>
            </div>

            <div v-if="getTrack.isRemovable" class="mt4">
              <div class="dib mr2-l pb2 pb0-l">
                <pure-button @click="$router.push({ name: 'sound-edit', params: { id: getTrack._id } })" v-text="$t('Edit')"></pure-button>
              </div>
              <div class="dib mr2-l pb2 pb0-l">
                <pure-confirm-modal-button
                  modalIcon="trash-o"
                  buttonColor="red"
                  @confirm="removeSound"
                >
                  <div slot="button" v-text="$t('Remove')"></div>
                  <div slot="modal" v-text="$t('Do you really want to delete this?')"></div>
                </pure-confirm-modal-button>
              </div>
              <file-upload-button
                      :buttonLabel="$t('Upload cover')"
                      :modalLabel="$t('Click here to upload image')"
                      @upload="uploadCover(arguments[0])"></file-upload-button>
            </div>

            <h2 class="f3 mb3 mt5" v-text="$t('Comments')"></h2>
            <comment-box :id="getTrack._id"></comment-box>
          </div>
        </div>

        <div v-if="!getTrack">
          <span v-text="$t('Sound not found')"></span>!
        </div>
      </div>
      <div slot="sidebar">

      </div>
    </layout-with-sidebar>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  import { addCoverFile } from '../../../api/StorageApi'
  import { detailSoundQuery, removeSound } from '../../../api/SoundApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import CommentBox from '../../stateful/Comment/StatefulCommentBox.vue'
  import { uploadCover } from '../../../api/Sound/SoundCoverApi'
  import { mapGraphlDataToSound } from '../../../func/mappers/mapSound'

  export default {
    components: {
      HeaderComponent,
      CommentBox,
    },
    data () {
      return {
        loading: 0,
        playingPos: 0,
      }
    },
    computed: mapState({
      isPlaying (state) {
        return state.soundPlayer.isPlaying && state.soundPlayer.currentId === this.getTrack._id
      },
    }),
    apollo: {
      getTrack: {
        query: detailSoundQuery,
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        variables () {
          return {
            id: this.$route.params.id,
          }
        },
      },
    },
    methods: {
      removeSound () {
        removeSound(this.getTrack._id).then(() => {
          this.$router.push({ name: 'profile-detail', params: { id: 'me' } })
        })
      },
      pauseTrack () {
        this.$store.dispatch('pause')
      },
      createSound () {
        return mapGraphlDataToSound(this.getTrack)
      },
      addToSoundPlayer () {
        this.$store.dispatch('addSoundToPlayer', { sound: this.createSound() })
      },
      playTrack () {
        this.$store.dispatch('playWithReset', { sound: this.createSound() })
      },
      playNext () {
        this.$store.dispatch('addSoundToPlayer', { sound: this.createSound(), relativePosition: 1 })
      },
      seekSound (amountInRelativeDecimal) {
        if (this.isPlaying) {
          this.$store.dispatch('playerSeekRelativeDecimal', amountInRelativeDecimal)
        } else {
          this.playTrack()
        }
      },
      uploadCover (e) {
        const file = e.target.files[0]

        addCoverFile(file)
          .then(({ _id, secret, url }) => uploadCover(this.getTrack._id, { _id, secret, url }))
          .then(() => {
            window.location.reload()
          })
      },
    },
  }
</script>
