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
                  @open-profile="$router.push('/profile/' + getTrack.creator._id)"
                  @open-track="playTrack"
                  @pauseTrack="pauseTrack"
                  :noBorder="true"
                  :fileUrl="$_fp.get('file.url')(getTrack)"
                  :playingPos="playingPos"
                  :isPlaying="isPlaying"
                  :waveform-src="getTrack.waveformSrc"></track-component>

          <div class="ph3">
            <div v-if="getTrack.isRemovable" class="mt4">
              <button-component @click="$router.push(`/tracks/${getTrack._id}/edit`)">Edit sound</button-component>
              <button-component @click="removeTrack" color="red">Remove sound</button-component>
              <file-upload-button
                      buttonLabel="Upload cover"
                      modalLabel="Click here to upload image"
                      @upload="uploadCover(arguments[0])"></file-upload-button>
            </div>

            <h2 class="f3 mb3 mt5">Comments 1</h2>
            <comment-box :id="getTrack._id"></comment-box>
          </div>
        </div>

        <div v-if="!getTrack">
          Track not found!
        </div>
      </div>
      <div slot="sidebar">
        Awesome sidebar! (add meta info and so on)
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script>
  import { addCoverFile } from '../../../api/StorageApi'
  import { detailTrackQuery, removeTrack } from '../../../api/TrackApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import CommentBox from '../../stateful/Comment/CommentBox.vue'
  import { uploadCover } from '../../../api/Track/TrackCoverApi'

  export default {
    components: {
      HeaderComponent,
      CommentBox,
    },
    data () {
      return {
        loading: 0,
        playingTrackId: null,
        isPlaying: false,
        playingPos: 0,
      }
    },
    apollo: {
      getTrack: {
        query: detailTrackQuery,
        loadingKey: 'loading',
        variables () {
          return {
            id: this.$route.params.id,
          }
        }
      }
    },
    methods: {
      removeTrack () {
        removeTrack(this.getTrack._id).then(() => this.$router.push('/profile/me'))
      },
      pauseTrack () {
        this.isPlaying = false
      },
      playTrack () {
        this.isPlaying = true
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
