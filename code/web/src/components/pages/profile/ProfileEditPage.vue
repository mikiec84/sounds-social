<template>
  <layout-component>
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
  </layout-component>
</template>
<script>
  import gql from 'graphql-tag'

  import ButtonComponent from '../../pure/Button.vue'
  import InputComponent from '../../pure/Input.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import UploadZone from '../../pure/Upload/UploadZone.vue'
  import ProfileImageComponent from '../../pure/profile/ProfileImage.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'
  import { addProfileAvatarFile } from '../../../api/StorageApi'

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

  const updateProfileMutation = gql`
    mutation ProfileUpdateMutation($profileData: ProfileData!) {
      updateUserProfile(profileData: $profileData) {
        description
      }
    }
  `

  export default {
    components: {
      UploadZone,
      HeaderComponent,
      ProfileImageComponent,
      LayoutComponent,
      ButtonComponent,
      InputComponent,
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

        this.formData.avatarFileId = addProfileAvatarFile(file)._id
        this.hasUploadedFile = addProfileAvatarFile(file)._id
      },
      updateProfile () {
        this.$apollo.mutate({
          mutation: updateProfileMutation,
          variables: {
            profileData: {
              ...this.$_.pick(this.getUser.profile, ['description', 'websiteUrl']),
              ...this.formData,
            },
          },
          fetchPolicy: 'network-only',
        }).then(() => {
          this.$router.push(`/profile/${this.$route.params.id}`)
          window.location.reload() // why is the fetch policy ignored?...
        })
      },
    },
  }
</script>
