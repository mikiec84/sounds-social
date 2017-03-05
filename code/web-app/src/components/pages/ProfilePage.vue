<template>
  <layout-component>
    <div slot="header">
      <header-component :current="$route.params.id === 'me' ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="User">
        <track-list-component :user-id="getUserId()"></track-list-component>
      </div>
      <div v-if="!User">
        user not found
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="User">
        <div class="tc mv4">
          <div class="dib">
            <profile-image-component source="http://tachyons.io/img/logo.jpg"></profile-image-component>
          </div>
        </div>

        <div class="tc">
          <h1 class="f2 lh-copy" v-text="User.username"></h1>
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
      User(auth0UserId: $id) {
        id
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
    apollo: {
      User: {
        query,
        variables() {
          return { id: this.getUserId() }
        },
      },
    },
    methods: {
      getUserId() {
        const id = this.$route.params.id

        if (id === 'me') {
          return getUserId()
        }

        return id
      }
    }
  }
</script>
