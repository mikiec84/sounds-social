<template>
  <div>
    <!-- TODO: create pure buttons with yarn play and use them here -->
    <form @submit.prevent="saveTrack()">
      <div class="pt3">
        <label>
          <div class="pb2">Name</div>
          <input type="text" @keyup="name = $event.target.value" />
        </label>
      </div>

      <div class="pt3">
        <label>
          <div class="pb2">Description</div>
          <textarea @keyup="description = $event.target.value"></textarea>
        </label>
      </div>

      <div class="pt3">
        <label>
          <div class="pb2">Upload</div>
          <input type="file" name="data" id="fileUploadInput" />
        </label>
      </div>

      <div class="pt3">
        <button>Save</button>
      </div>
    </form>
  </div>
</template>
<script>
  import gql from 'graphql-tag'
  import Dropzone from 'dropzone'

  const createTrackMutation = gql`
    mutation ($name: String!, $description: String!, $creatorId: ID!, $fileId: ID, $waveform: String!) {
      createTrack(name: $name, creatorId: $creatorId, waveformSrc: $waveform, fileId: $fileId,  isPublic: true, description: $description) {
        id
      }
    }
`

  export default {
    data() {
      return {
        name: '',
        description: '',
        fileId: '',
      }
    },
    mounted() {
      const componentScope = this

      new Dropzone('#fileUploadInput', {
        init: function() {
          this.on('addedfile', function(file) {
            // TODO: show loader
          })
          this.on('error', () => alert('Had error'))
          this.on('success', (file, data) => {
            alert('Uploaded!')
            componentScope.fileId = data.id
          })
        },
        paramName: 'data',
        url: 'https://api.graph.cool/file/v1/ciza7bn1537xm016692k04bgn',
      })
    },
    methods: {
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
