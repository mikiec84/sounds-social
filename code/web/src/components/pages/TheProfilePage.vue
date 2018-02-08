<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component :current="isCurrentUser ? 'profile' : 'sounds'"></header-component>
    </div>
    <div slot="main">
      <div v-if="getUser">
        <pure-title v-text="getUser.username"></pure-title>
        <div v-if="isCurrentUser">
          <h2 class="f3 f2-ns mv3 gray" v-text="`(${$t('this is you')})`"></h2>
        </div>
        <sound-list-component v-if="profileUserId" :userId="profileUserId"></sound-list-component>
      </div>
      <div v-if="!getUser">
        <div class="i" v-text="$t('User not found')"></div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="getUser">
        <stateful-profile-box :user="getUser"></stateful-profile-box>

        <div class="mv4 tc" v-if="isCurrentUser">
          <pure-button @click="$router.push({ name: 'profile-edit', params: { id: getUser._id } })" v-text="$t('Edit profile')"></pure-button>
          <div class="dib dn-l">
            <pure-button @click="authLogOut" color="gray" v-text="$t('Logout')"></pure-button>
          </div>
        </div>

        <stateful-playlist-list :user-id="getUser._id"></stateful-playlist-list>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script type="text/ecmascript-6">
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import SoundListComponent from '../stateful/sound/StatefulSoundList.vue'
  import StatefulPlaylistList from '../stateful/Playlist/StatefulPlaylistList.vue'
  import StatefulProfileBox from '../stateful/Profile/StatefulUserProfileBox.vue'
  import { getUserId } from '../../api/AuthApi'
  import { profilePageQuery as query } from '../../api/ProfileApi'

  export default {
    components: {
      HeaderComponent,
      SoundListComponent,
      StatefulPlaylistList,
      StatefulProfileBox,
    },
    metaInfo () {
      if (this.getUser) {
        return {
          title: this.getUser.username,
        }
      }

      return {}
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
    }
  }
</script>
