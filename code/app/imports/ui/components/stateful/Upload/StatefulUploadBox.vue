<template>
  <div>
    <div id="trackUploadBox">
      <track-upload-box
        :username="username"
        :hasFile="hasFile"
        :isUploading="isUploading"
        :fileUrl="fileUrl"
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
  import TrackUploadBox from '../../pure/track/TrackUploadBox.vue'
  import { getUsername, getUserId } from '../../../api/AuthApi'

  const createTrackMutation = gql`
    mutation ($name: String!, $description: String, $fileId: String!, $fileSecret: String! $fileUrl: String! $creatorId: String!) {
      createTrack(data: {
        name: $name,
        creatorId: $creatorId,
        fileId: $fileId,
        fileUrl: $fileUrl,
        fileSecret: $fileSecret,
        isPublic: true,
        description: $description
      }) {
        _id
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
        userId: '',
        fileUrl: '',
        fileData: {},
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
            componentScope.fileData = JSON.parse(data)
            componentScope.fileUrl = componentScope.fileData.url
          })
        },
        paramName: 'data',
          url: 'https://api.graph.cool/file/v1/ciza7bn1537xm016692k04bgn',
      }

      import Dropzone from 'dropzone/dist/dropzone'

      new Dropzone('#trackUploadBox', dropzoneConfig)
      new Dropzone('#fileUploadInput', dropzoneConfig)

      getUsername().then(username => this.username = username)
      getUserId().then(id => this.userId = id)
    },
    methods: {
      openFileDialog() {
        window.document.getElementById('fileUploadInput').click()
      },
      saveTrack() {
        const { name, userId, description, fileData } = this

        console.log(name, description, fileData)
        this.$apollo
          .mutate({
            mutation: createTrackMutation,
            variables: {
              name,
              description,
              creatorId: userId,
              fileId: fileData.id,
              fileUrl: fileData.url,
              fileSecret: fileData.secret,
            },
          })
          .then((data) => (data.data.createTrack ? this.$router.push(`/tracks/${data.data.createTrack._id}`) : null))
      },
    },
  }
</script>
