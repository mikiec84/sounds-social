<template>
  <div v-if="!loading">
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="getTrack">
          <track-component
                  :timeAgo="getTrack.createdAt"
                  :label="getTrack.name"
                  :coverFileUrl="getTrack.coverFile"
                  :description="getTrack.description"
                  :username="getTrack.creator.username"
                  @open-profile="$router.push('/profile/' + getTrack.creator._id)"
                  @open-track="playTrack"
                  @pauseTrack="pauseTrack"
                  :noBorder="true"
                  :fileUrl="getTrack.fileUrl"
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

            <h2 class="f3 mb3 mt5">Comments</h2>
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
    </layout-component>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import { $ } from 'meteor/jquery'

  import { addCoverFile } from '../../../../data/file/CoverStorage'
  import { detailTrackQuery } from '../../../api/TrackApi'
  import TrackComponent from '../../pure/track/Track.vue'
  import ButtonComponent from '../../pure/Button.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'
  import FileUploadButton from '../../pure/Upload/FileUploadButton.vue'
  import CommentBox from '../../stateful/Comment/CommentBox.vue'

  const uploadCoverMutation = gql`
    mutation UploadCover($trackId: String!, $fileId: String!) {
      addCoverFileId(trackId: $trackId, fileId: $fileId) {
        _id
      }
    }
  `

  export default {
    components: {
      TrackComponent,
      LayoutComponent,
      HeaderComponent,
      ButtonComponent,
      CommentBox,
      FileUploadButton,
    },
    data() {
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
        variables() {
          return {
            id: this.$route.params.id,
          }
        }
      }
    },
    methods: {
      removeTrack() {
        this.$apollo.mutate({
          mutation: gql`
mutation RemoveTrack($id: String!) {
    deleteTrack(_id: $id) {
      _id
    }
}
          `,
          variables: {
            id: this.getTrack._id,
          },
          refetchQueries: ['DetailTrack'],
        }).then(() => this.$router.push('/profile/me'))
      },
      pauseTrack() {
        this.isPlaying = false
      },
      playTrack() {
        this.isPlaying = true
      },
      uploadCover(e) {
        const file = $(e.target).get(0).files[0]

        this.$apollo.mutate({
          mutation: uploadCoverMutation,
          variables: {
            fileId: addCoverFile(file)._id,
            trackId: this.getTrack._id,
          },
          fetchPolicy: 'network-only',
        }).then(track => {
          window.location.reload()
        })
      },
    },
  };
</script>
