<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component :current="$route.params.id === 'me' ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser" class="f3 mw7">
        <h1 class="f-headline mv3">Edit profile: <span v-text="getUser.username"></span></h1>

        <div class="mt4">
          <upload-zone
                  label="Update profile avatar"
                  @upload="uploadAvatarFileImage(arguments[0])"></upload-zone>

          <div v-if="hasUploadedFile" class="mt3 i mid-gray">File uploaded!</div>
        </div>

        <div class="mt3">
          <label>
            <div class="mb2">
              Description
            </div>
            <textarea
                    class="w-100"
                    style="height: 180px"
                    @change="formData.description = $event.target.value">{{getUser.profile.description}}</textarea>
          </label>
        </div>

        <div class="mt3">
          <label>
            <div class="mb2">
              Website Url
            </div>
            <input-component
                    @keyup="formData.websiteUrl = arguments[0]"
                    :value="getUser.profile.websiteUrl"></input-component>
          </label>
        </div>

        <div class="mv4">
          <button-component
            @click="updateProfile"
          >Update profile</button-component>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script>
  import gql from 'graphql-tag'

  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import { addProfileAvatarFile } from '../../../api/StorageApi'
  import { updateProfile } from '../../../api/ProfileApi'

  const query = gql`
    query ProfilePage($id: String!) {
      getUser(_id: $id) {
        _id
        username
        isFollowedByCurrentUser
        profile {
          description
          websiteUrl
        }
      }
    }
  `

  export default {
    components: {
      HeaderComponent,
    },
    data () {
      return {
        getUser: null,
        userId: '',
        hasUploadedFile: false,
        formData: {},
      }
    },
    apollo: {
      getUser: {
        query,
        variables () {
          return { id: this.$route.params.id }
        },
      },
    },
    methods: {
      uploadAvatarFileImage (e) {
        const file = e.target.files[0]

        addProfileAvatarFile(file).then(({ _id, secret, url }) => {
          this.formData.avatarFile = { _id, secret, url }
          console.log(this.formData.avatarFile)
          this.hasUploadedFile = !!_id
        })
      },
      updateProfile () {
        updateProfile({
          ...this.$_.pick(this.getUser.profile, ['description', 'websiteUrl']),
          ...this.formData,
        }).then(() => {
          this.$router.push(`/profile/${this.$route.params.id}`)
          window.location.reload() // why is the fetch policy ignored?...
        })
      },
    },
  }
</script>
