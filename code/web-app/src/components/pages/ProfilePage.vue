<template>
  <layout-component>
    <div slot="header">
      <header-component :current="$route.params.id === 'me' ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser">
        <track-list-component v-if="profileUserId" :userId="profileUserId"></track-list-component>
      </div>
      <div v-if="!getUser">
        user not found
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="getUser">
        <div class="tc mv4">
          <div class="dib">
            <profile-image-component source="http://tachyons.io/img/logo.jpg"></profile-image-component>
          </div>
        </div>

        <div class="tc">
          <h1 class="f2 lh-copy" v-text="getUser.username"></h1>
        </div>

        Awesome sidebar! (add description and so on)
      </div>
    </div>
  </layout-component>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'

  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import ProfileImageComponent from '../pure/profile/ProfileImage.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'
  import TrackListComponent from '../stateful/track/StatefulTrackList.vue'
  import { getUserId } from '../../api/AuthApi'

  const query = gql`
    query ($id: String!) {
      getUser(_id: $id) {
        _id
        username
      }
    }
  `

  export default {
    components: {
      HeaderComponent,
      ProfileImageComponent,
      LayoutComponent,
      TrackListComponent,
    },
    data() {
      return {
        userId: '',
      }
    },
    mounted() {
      getUserId().then(id => this.userId = id)
    },
    apollo: {
      getUser: {
        query,
        variables() {
          return { id: this.profileUserId }
        },
      },
    },
    computed: {
      profileUserId() {
        const id = this.$route.params.id

        if (id === 'me') {
          return this.userId
        }

        console.log(id)
        return id
      }
    }
  }
</script>
