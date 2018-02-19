<template>
  <div>
    <div id="soundUploadBox">
      <sound-form-box
        :username="username"
        :groups="groupOptionData"
        :hasFile="hasFile"
        :isUploading="isUploading"
        :name="name"
        @changeTitle="name = arguments[0]"
        @changeDescription="description = arguments[0]"
        @changeUploader="uploader = arguments[0]"
        @publish="saveSound(true)"
        @uploadFile="uploadMusicFile(arguments[0])"
      >
        <div class="dib ml1" slot="additionalButtons">
          <pure-button color="gray" :disabled="isUploading" @click="saveSound(false)" v-text="`${$t('Save')} (${$t('Private')})`"></pure-button>
        </div>
      </sound-form-box>
    </div>
    <div class="dn">
      <input type="file" name="data" id="fileUploadInput" />
    </div>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import { getUsername, getUserId } from '../../../api/AuthApi'
  import { addMusicFile } from '../../../api/StorageApi'
  import { groupOptionDataQuery } from '../../../api/GroupApi'

  const createSoundMutation = gql`
    mutation ($name: String! $groupId: String $description: String $file: FileData! $creatorId: String! $isPublic: Boolean!) {
      createSound(groupId: $groupId data: {
        name: $name
        creatorId: $creatorId
        file: $file
        isPublic: $isPublic
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
        groupOptionData: [],
        uploader: 'user',
        userId: '',
        fileId: '',
      }
    },
    mounted () {
      getUsername().then(username => { this.username = username })
      getUserId().then(id => { this.userId = id })
    },
    apollo: {
      groupOptionData: {
        query: groupOptionDataQuery,
      }
    },
    methods: {
      uploadMusicFile (e) {
        const file = e.target.files[0]

        this.hasFile = true
        this.isUploading = true

        addMusicFile(file)
          .then(({ _id, secret, url }) => {
            this.file = { _id, secret, url }
            this.fileId = _id
            this.isUploading = false
          })
          .catch(() => {
            this.isUploading = false
            this.hasFile = false
            alert(this.$t('Wrong file format'))
          })
      },
      saveSound (isPublic) {
        const { name, userId, uploader, description, file } = this

        const isUser = uploader === 'user'

        this.$apollo
          .mutate({
            mutation: createSoundMutation,
            variables: {
              name,
              description,
              file,
              groupId: isUser ? null : uploader,
              creatorId: userId,
              isPublic,
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
