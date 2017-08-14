<template>
  <div v-if="!loading">
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="trackToEdit">
          <track-form-box
                  :username="trackToEdit.creator.username"
                  :hasFile="true"
                  :isUploading="false"
                  :name="formData.name || trackToEdit.name"
                  :description="formData.description || trackToEdit.description"
                  buttonLabel="Save"
                  @changeTitle="formData.name = arguments[0]"
                  @changeDescription="formData.description = arguments[0]"
                  @publish="saveTrack()"
          ></track-form-box>
        </div>

        <div v-if="!trackToEdit">
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
  import { editTrackFormQuery, updateTrackMutation } from '../../../api/TrackApi'
  import TrackFormBox from '../../pure/track/TrackFormBox.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'

  export default {
    components: {
      LayoutComponent,
      HeaderComponent,
      TrackFormBox,
    },
    data() {
      return {
        loading: 0,
        formData: {},
      }
    },
    apollo: {
      trackToEdit: {
        query: editTrackFormQuery,
        loadingKey: 'loading',
        variables() {
          return {
            id: this.$route.params.id,
          }
        },
      },
    },
    methods: {
      saveTrack() {
        this.$apollo.mutate({
          mutation: updateTrackMutation,
          variables: {
            id: this.$route.params.id,
            data: {
              ...this.$_.pick(this.trackToEdit, ['name', 'description', 'fileId']),
              ...this.formData,
              isPublic: true,
              creatorId: this.trackToEdit.creator._id,
            }
          },
          fetchPolicy: 'network-only',
        }).then(() => {
          this.$router.push(`/tracks/${this.$route.params.id}`)
          window.location.reload() // why is the fetch policy ignored?...
        })
      },
    },
  }
</script>
