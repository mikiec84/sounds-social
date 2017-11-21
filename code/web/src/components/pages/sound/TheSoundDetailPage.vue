<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <pure-loader-transition :is-loading="loading">
        <div slot="loader"><pure-loader-sound :isDetail="true"></pure-loader-sound></div>
        <div slot="content">
          <div v-if="getSound">
            <sound-component
              :timeAgo="getSound.createdAt.fromNow"
              :label="getSound.name"
              :coverFileUrl="$_fp.get('coverFile.url')(getSound)"
              :description="getSound.description"
              :username="getSound.creator.username"
              :isPrivate="!getSound.isPublic"
              @open-profile="$router.push({ name: 'profile-detail', params: { id: getSound.creator._id } })"
              @open-sound="playSound"
              @play-sound="playSound"
              @pauseSound="pauseSound"
              @seekSound="seekSound"
              :noBorder="true"
              :fileUrl="$_fp.get('file.url')(getSound)"
              :playingPos="playingPos"
              :isPlaying="isPlaying"
              :waveformSeek="isPlaying ? $store.getters.seekRelativeDecimal : 0">
              <div slot="metadata">
                <div class="gray f6"><span v-text="getSound.playsCount"></span> <pure-icon icon="play-circle"></pure-icon></div>
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

              <div v-if="getSound.isRemovable" class="mt4">
                <div class="dib mr2-l pb2 pb0-l" v-if="!getSound.isPublic">
                  <pure-button @click="publishSound" v-text="$t('Publish')"></pure-button>
                </div>
                <div class="dib mr2-l pb2 pb0-l">
                  <pure-button @click="$router.push({ name: 'sound-edit', params: { id: getSound._id } })" v-text="$t('Edit')"></pure-button>
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
              <comment-box :id="getSound._id"></comment-box>
            </div>
          </div>

          <div v-if="!getSound">
            <span v-text="$t('Sound not found')"></span>!
          </div>
        </div>
      </pure-loader-transition>
    </div>
    <div slot="sidebar">

    </div>
  </layout-with-sidebar>
</template>
<script>
  import { mapState } from 'vuex'

  import { addCoverFile } from '../../../api/StorageApi'
  import { detailSoundQuery, removeSound, publishSound } from '../../../api/SoundApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import CommentBox from '../../stateful/Comment/StatefulCommentBox.vue'
  import { uploadCover } from '../../../api/Sound/SoundCoverApi'
  import { mapGraphlDataToSound } from '../../../func/mappers/mapSound'

  export default {
    components: {
      HeaderComponent,
      CommentBox,
    },
    metaInfo () {
      if (!this.getSound) {
        return {}
      }

      return {
        title: `${this.getSound.name} ${this.$t('by')} ${this.getSound.creator.username}`,
      }
    },
    data () {
      return {
        loading: 0,
        playingPos: 0,
      }
    },
    computed: mapState({
      isPlaying (state) {
        return state.soundPlayer.isPlaying && state.soundPlayer.currentId === this.getSound._id
      },
    }),
    apollo: {
      getSound: {
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
        removeSound(this.getSound._id).then(() => {
          this.$router.push({ name: 'profile-detail', params: { id: 'me' } })
        })
      },
      pauseSound () {
        this.$store.dispatch('pause')
      },
      createSound () {
        return mapGraphlDataToSound(this.getSound)
      },
      addToSoundPlayer () {
        this.$store.dispatch('addSoundToPlayer', { sound: this.createSound() })
      },
      playSound () {
        this.$store.dispatch('playWithReset', { sound: this.createSound() })
      },
      playNext () {
        this.$store.dispatch('addSoundToPlayer', { sound: this.createSound(), relativePosition: 1 })
      },
      publishSound () {
        publishSound(this.getSound._id)
      },
      seekSound (amountInRelativeDecimal) {
        if (this.isPlaying) {
          this.$store.dispatch('playerSeekRelativeDecimal', amountInRelativeDecimal)
        } else {
          this.playSound()
        }
      },
      uploadCover (e) {
        const file = e.target.files[0]

        addCoverFile(file)
          .then(({ _id, secret, url }) => uploadCover(this.getSound._id, { _id, secret, url }))
      },
    },
  }
</script>
