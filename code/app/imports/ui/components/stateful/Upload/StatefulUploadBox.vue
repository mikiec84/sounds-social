<template>
  <div>
    <div id="trackUploadBox">
      <track-form-box
        :username="username"
        :hasFile="hasFile"
        :isUploading="isUploading"
        @changeTitle="name = arguments[0]"
        @changeDescription="description = arguments[0]"
        @publish="saveTrack()"
        @uploadFile="uploadMusicFile(arguments[0])"
      ></track-form-box>
    </div>
    <div class="dn-ns">
      <input type="file" name="data" id="fileUploadInput" />
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import TrackFormBox from '../../pure/track/TrackFormBox.vue'
  import { getUsername, getUserId } from '../../../api/AuthApi'
  import { addMusicFile } from '../../../../data/file/MusicStorage'

  const createTrackMutation = gql`
    mutation ($name: String! $description: String $fileId: String! $creatorId: String!) {
      createTrack(data: {
        name: $name,
        creatorId: $creatorId,
        fileId: $fileId,
        isPublic: true,
        description: $description
      }) {
        _id
      }
    }
`

  export default {
    components: { TrackFormBox },
    data() {
      return {
        hasFile: false,
        isUploading: false,
        username: '',
        name: '',
        description: '',
        userId: '',
        fileId: '',
      }
    },
    mounted() {
      getUsername().then(username => this.username = username)
      getUserId().then(id => this.userId = id)
    },
    methods: {
      uploadMusicFile(e) {
        const file = $(e.target).get(0).files[0]

        this.fileId = addMusicFile(file)._id
        this.hasFile = true
      },
      saveTrack() {
        const { name, userId, description, fileId } = this

        this.$apollo
          .mutate({
            mutation: createTrackMutation,
            variables: {
              name,
              description,
              fileId,
              creatorId: userId,
            },
          })
          .then((data) => (data.data.createTrack ? this.$router.push(`/tracks/${data.data.createTrack._id}`) : null))
      },
    },
  }
</script>
