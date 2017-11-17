<template>
  <div>
    <div class="shadow-1">
    <header-component
      :active-item-id="current"
      :is-logged-in="userIsAuthenticated"
      :notifications="notificationList"
      :search-query="searchQuery"
      @search="doSearch"
      @openNotification="openNotification"
      @openAuthor="$router.push({ name: 'profile-detail', params: { id: arguments[0].authorId } })"
      @openNotificationPage="openNotificationPage"
      @logout="authLogOut"></header-component>
    </div>
      <stateful-sound-player
        @openSound="$router.push({ name: 'sound-detail', params: { id: arguments[0] } })"
        @openProfile="$router.push({ name: 'profile-detail', params: { id: arguments[0] } })"
      ></stateful-sound-player>
  </div>
</template>
<script>
  import StatefulSoundPlayer from './track/StatefulSoundPlayer.vue'
  import { listRecentNotificationsQuery as query } from '../../api/NotificationApi'
  import { mapNotification } from '../../func/mappers/mapNotification'

  export default {
    components: { StatefulSoundPlayer },
    props: {
      current: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        listNotifications: [],
      }
    },
    apollo: {
      listNotifications: {
        query,
        fetchPolicy: 'network-only',
        variables () {
          return { id: this.profileUserId }
        },
      },
    },
    computed: {
      notificationList () {
        return this.listNotifications.map(mapNotification)
      },
      searchQuery () {
        if (this.$route.name === 'search') return this.$route.query.q
      },
    },
    methods: {
      openNotification ({ originalNotification: { referenceType, referenceId } }) {
        if (referenceType === 'sound') {
          this.$router.push({ name: 'sound-detail', params: { id: referenceId } })
        }
      },
      openNotificationPage () {
        window.alert('To be implemented')
      },
      doSearch (q) {
        this.$router.push({ name: 'search', query: { q } })
      },
    },
  }
</script>
