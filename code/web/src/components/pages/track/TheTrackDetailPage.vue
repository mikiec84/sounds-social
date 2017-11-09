<template>
  <div v-if="!loading">
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="getTrack">
          <track-component
                  :timeAgo="getTrack.createdAt"
                  :label="getTrack.name"
                  :coverFileUrl="$_fp.get('coverFile.url')(getTrack)"
                  :description="getTrack.description"
                  :username="getTrack.creator.username"
                  @open-profile="$router.push({ name: 'profile-detail', params: { id: getTrack.creator._id } })"
                  @open-track="playTrack"
                  @pauseTrack="pauseTrack"
                  @seekSound="seekSound"
                  :noBorder="true"
                  :fileUrl="$_fp.get('file.url')(getTrack)"
                  :playingPos="playingPos"
                  :isPlaying="isPlaying"
                  :waveformSeek="isPlaying ? $store.getters.seekRelativeDecimal : 0"></track-component>

          <div class="ph3">
            <div class="mt4">
              <div class="dib mr2-l pb2 pb0-l">
                <button-component @click="playNext" v-text="$t('Play next')"></button-component>
              </div>
              <div class="dib mr2-l pb2 pb0-l">
                <button-component @click="addToSoundPlayer" v-text="$t('Play later')"></button-component>
              </div>
            </div>

            <div v-if="getTrack.isRemovable" class="mt4">
              <div class="dib mr2-l pb2 pb0-l">
                <button-component @click="$router.push({ name: 'sound-edit', params: { id: getTrack._id } })" v-text="$t('Edit')"></button-component>
              </div>
              <div class="dib mr2-l pb2 pb0-l">
                <confirm-modal-button
                  modalIcon="trash-o"
                  buttonColor="red"
                  @confirm="removeTrack"
                >
                  <div slot="button" v-text="$t('Remove')"></div>
                  <div slot="modal" v-text="$t('Do you really want to delete this?')"></div>
                </confirm-modal-button>
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
        Awesome sidebar! (add meta info and so on)
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  import { addCoverFile } from '../../../api/StorageApi'
  import { detailTrackQuery, removeTrack } from '../../../api/TrackApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import CommentBox from '../../stateful/Comment/CommentBox.vue'
  import { uploadCover } from '../../../api/Sound/SoundCoverApi'
  import { mapGraphlDataToSound } from '../../../func/createSound'

  export default {
    components: {
      HeaderComponent,
      CommentBox,
    },
    data () {
      return {
        loading: 0,
        playingTrackId: null,
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
        query: detailTrackQuery,
        loadingKey: 'loading',
        variables () {
          return {
            id: this.$route.params.id,
          }
        },
      },
    },
    methods: {
      removeTrack () {
        removeTrack(this.getTrack._id).then(() => {
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
