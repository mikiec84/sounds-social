<template>
  <div>
    <div id="soundUploadBox">
      <sound-form-box
        :username="username"
        :hasFile="hasFile"
        :isUploading="isUploading"
        :name="name"
        @changeTitle="name = arguments[0]"
        @changeDescription="description = arguments[0]"
        @publish="saveSound()"
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

  const createSoundMutation = gql`
    mutation ($name: String! $description: String $file: FileData! $creatorId: String!) {
      createSound(data: {
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
      saveSound () {
        const { name, userId, description, file } = this

        this.$apollo
          .mutate({
            mutation: createSoundMutation,
            variables: {
              name,
              description,
              file,
              creatorId: userId,
            },
          })
          .then((data) => (data.data.createSound ? this.$router.push({
            name: 'sound-detail',
            params: {
              id: data.data.createSound._id,
            },
          }) : null))
      },
    },
  }
</script>
