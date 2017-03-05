<template>
  <div>
    <div id="trackUploadBox">
      <track-upload-box
        :username="username"
        :hasFile="hasFile"
        :isUploading="isUploading"
        @openFileDialog="openFileDialog()"
        @changeTitle="name = arguments[0]"
        @changeDescription="description = arguments[0]"
        @publish="saveTrack()"
      ></track-upload-box>
    </div>
    <div class="dn-ns">
      <input type="file" name="data" id="fileUploadInput" />
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import Dropzone from 'dropzone'
  import TrackUploadBox from '../../pure/track/TrackUploadBox.vue'
  import { getUsername } from '../../../api/AuthApi'

  const createTrackMutation = gql`
    mutation ($name: String!, $description: String!, $creatorId: ID!, $fileId: ID, $waveform: String!) {
      createTrack(name: $name, creatorId: $creatorId, waveformSrc: $waveform, fileId: $fileId,  isPublic: true, description: $description) {
        id
      }
    }
`

  export default {
    components: { TrackUploadBox },
    data() {
      return {
        hasFile: false,
        isUploading: false,
        username: '',
        name: '',
        description: '',
        fileId: '',
      }
    },
    mounted() {
      const componentScope = this

      const dropzoneConfig = {
        init: function() {
          this.on('addedfile', (file) => {
            componentScope.isUploading = true
            componentScope.hasFile = true
          })
          this.on('error', () => alert('Had error'))
          this.on('success', (file, data) => {
            componentScope.isUploading = false
            componentScope.hasFile = true
            componentScope.fileId = data.id
          })
        },
        paramName: 'data',
        url: 'https://api.graph.cool/file/v1/ciza7bn1537xm016692k04bgn',
      }

      new Dropzone('#trackUploadBox', dropzoneConfig)
      new Dropzone('#fileUploadInput', dropzoneConfig)

      getUsername().then(username => this.username = username)
    },
    methods: {
      openFileDialog() {
        window.document.getElementById('fileUploadInput').click()
      },
      saveTrack() {
        const { name, description, fileId } = this

        this.$apollo
          .mutate({
            mutation: createTrackMutation,
            variables: {
              name,
              description,
              fileId,
              creatorId: 'cizbpxps1v9pa0166rf8lwlg0',
              waveform: 'http://i.imgur.com/oNy41Cr.png',
            },
          })
          .then((data) => this.$router.push(`/tracks/${data.data.createTrack.id}`))
      },
    },
  }
</script>
