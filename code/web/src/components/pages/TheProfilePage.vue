<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component :current="isCurrentUser ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser">
        <h1 class="f-headline mv3" v-text="getUser.username"></h1>
        <div v-if="isCurrentUser">
          <h2 class="f2 mv3 gray" v-text="`(${$t('this is you')})`"></h2>
        </div>
        <sound-list-component v-if="profileUserId" :userId="profileUserId"></sound-list-component>
      </div>
      <div v-if="!getUser">
        <div class="i" v-text="$t('User not found')"></div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="getUser">
        <div class="tc mv4">
          <div class="dib">
            <profile-image :source="profileAvatarImage"></profile-image>
          </div>
        </div>

        <div v-if="getUser.profile.description" v-text="getUser.profile.description" class="mt3 pl4 lh-copy">

        </div>

        <div v-if="getUser.profile.websiteUrl" class="mt3 pl4">
          <span class="b"><span v-text="$t('Website')"></span>: </span>
          <div class="mt2">
            <a class="link dark-blue" :href="getUser.profile.websiteUrl" v-text="getUser.profile.websiteUrl"></a>
          </div>
        </div>

        <div class="mv4 tc" v-if="!isCurrentUser && userIsAuthenticated">
          <pure-button @click="getUser.isFollowedByCurrentUser ? unfollow(getUser._id) : follow(getUser._id)">
            <div>
              <div v-if="getUser.isFollowedByCurrentUser" v-text="$t('Unfollow')"></div>
              <div v-if="!getUser.isFollowedByCurrentUser" v-text="$t('Follow')"></div>
            </div>
          </pure-button>
        </div>

        <div class="mv4 tc" v-if="isCurrentUser">
          <pure-button @click="$router.push({ name: 'profile-edit', params: { id: getUser._id } })" v-text="$t('Edit profile')"></pure-button>
          <div class="dib dn-l">
            <pure-button @click="authLogOut" color="gray" v-text="$t('Logout')"></pure-button>
          </div>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'

  import { getImage } from '../../func/getImage'
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import SoundListComponent from '../stateful/track/StatefulSoundList.vue'
  import { getUserId } from '../../api/AuthApi'
  import { follow, unfollow } from '../../api/ProfileApi'

  const query = gql`
    query ProfilePage($id: String!) {
      getUser(_id: $id) {
        _id
        username
        isFollowedByCurrentUser
        profile {
          description
          websiteUrl
          avatarFile {
            url
          }
        }
      }
    }
  `

  export default {
    components: {
      HeaderComponent,
      SoundListComponent,
    },
    data () {
      return {
        getUser: null,
        userId: '',
      }
    },
    mounted () {
      getUserId().then(id => {
        this.userId = id
      })
    },
    apollo: {
      getUser: {
        query,
        fetchPolicy: 'network-only',
        variables () {
          return { id: this.profileUserId }
        },
      },
    },
    computed: {
      isCurrentUser () {
        return this.profileUserId === this.userId
      },
      profileUserId () {
        const id = this.$route.params.id

        if (id === 'me') {
          return this.userId
        }

        return id
      },
      profileAvatarImage () {
        return getImage('getUser.profile.avatarFile.url')(this)
      },
    },
    methods: {
      follow (userId) {
        follow(userId)
      },
      unfollow (userId) {
        unfollow(userId)
      },
    },
  }
</script>
