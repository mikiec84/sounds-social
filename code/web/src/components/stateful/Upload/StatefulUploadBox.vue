<template>
  <div>
    <div id="trackUploadBox">
      <sound-form-box
        :username="username"
        :hasFile="hasFile"
        :isUploading="isUploading"
        @changeTitle="name = arguments[0]"
        @changeDescription="description = arguments[0]"
        @publish="saveTrack()"
        @uploadFile="uploadMusicFile(arguments[0])"
      ></sound-form-box>
    </div>
    <div class="dn-ns">
      <input type="file" name="data" id="fileUploadInput" />
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import { getUsername, getUserId } from '../../../api/AuthApi'
  import { addMusicFile } from '../../../api/StorageApi'

  const createTrackMutation = gql`
    mutation ($name: String! $description: String $file: FileData! $creatorId: String!) {
      createTrack(data: {
        name: $name,
        creatorId: $creatorId,
        file: $file,
        isPublic: true,
        description: $description
      }) {
        _id
      }
    }
`

  export default {
    data () {
      return {
        hasFile: false,
        isUploading: false,
        username: '',
        name: '',
        description: '',
        file: {},
        userId: '',
        fileId: '',
      }
    },
    mounted () {
      getUsername().then(username => { this.username = username })
      getUserId().then(id => { this.userId = id })
    },
    methods: {
      uploadMusicFile (e) {
        const file = e.target.files[0]

        this.hasFile = true
        this.isUploading = true

        addMusicFile(file).then(({ _id, secret, url }) => {
          this.file = { _id, secret, url }
          this.fileId = _id
          this.isUploading = false
        })
      },
      saveTrack () {
        const { name, userId, description, file } = this

        this.$apollo
          .mutate({
            mutation: createTrackMutation,
            variables: {
              name,
              description,
              file,
              creatorId: userId,
            },
          })
          .then((data) => (data.data.createTrack ? this.$router.push(`/tracks/${data.data.createTrack._id}`) : null))
      },
    },
  }
</script>
