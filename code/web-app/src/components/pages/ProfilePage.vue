<template>
  <layout-component>
    <div slot="header">
      <header-component :current="$route.params.id === 'me' ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser">
        <h1 class="f-headline mv3" v-text="getUser.username"></h1>
        <track-list-component v-if="profileUserId" :userId="profileUserId"></track-list-component>
      </div>
      <div v-if="!getUser">
        <div class="i">User not found</div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="getUser">
        <div class="tc mv4">
          <div class="dib">
            <profile-image-component source="http://tachyons.io/img/logo.jpg"></profile-image-component>
          </div>
        </div>

        <div class="mv4 tc" v-if="!isCurrentUser">
          <button-component @click="getUser.isFollowedByCurrentUser ? unfollow(getUser._id) : follow(getUser._id)">
            <div>
              <div v-if="getUser.isFollowedByCurrentUser">Unfollow</div>
              <div v-if="!getUser.isFollowedByCurrentUser">Follow</div>
            </div>
          </button-component>
        </div>

        Awesome sidebar! (add description and so on)
      </div>
    </div>
  </layout-component>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'

  import ButtonComponent from '../pure/Button.vue'
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import ProfileImageComponent from '../pure/profile/ProfileImage.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'
  import TrackListComponent from '../stateful/track/StatefulTrackList.vue'
  import { getUserId } from '../../api/AuthApi'

  const query = gql`
    query ProfilePage($id: String!) {
      getUser(_id: $id) {
        _id
        username
        isFollowedByCurrentUser
      }
    }
  `

  const followMutationDoc = gql`
  mutation FollowMutation($id: String!) {
    followUser(toFollowId: $id) {
      _id
    }
  }
`

  const unfollowMutationDoc = gql`
  mutation UnfollowMutation($id: String!) {
    unfollowUser(toUnfollowId: $id) {
      _id
    }
  }
`

  export default {
    components: {
      HeaderComponent,
      ProfileImageComponent,
      LayoutComponent,
      TrackListComponent,
      ButtonComponent,
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
        forceFetch: true,
        variables() {
          return { id: this.profileUserId }
        },
      },
    },
    computed: {
      isCurrentUser() {
        return this.profileUserId === this.userId
      },
      profileUserId() {
        const id = this.$route.params.id

        if (id === 'me') {
          return this.userId
        }

        return id
      },
    },
    methods: {
      follow(userId) {
        this.$apollo.mutate({
          mutation: followMutationDoc,
          variables: {
            id: userId,
          },
          refetchQueries: ['ProfilePage'],
        })
      },
      unfollow(userId) {
        this.$apollo.mutate({
          mutation: unfollowMutationDoc,
          variables: {
            id: userId,
          },
          refetchQueries: ['ProfilePage'],
        })
      },
    },
  }
</script>
