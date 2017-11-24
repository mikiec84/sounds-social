<template>
  <div>
    <div class="shadow-1">
      <pure-header
        ref="pureHeader"
        :active-item-id="current"
        :is-logged-in="userIsAuthenticated"
        :notifications="notificationList"
        :search-query="searchQuery"
        :menu-items="menuItems"
        @search="doSearch"
        @openNotification="openNotification"
        @openAuthor="openAuthor"
        @openNotificationPage="openNotificationPage"
        @logout="authLogOut"></pure-header>
    </div>

    <stateful-sound-player
      @openSound="$router.push({ name: 'sound-detail', params: { id: arguments[0] } })"
      @openProfile="$router.push({ name: 'profile-detail', params: { id: arguments[0] } })"
    ></stateful-sound-player>

    <div v-if="notificationCenterOpen">
      <stateful-notification-center-modal @close="notificationCenterOpen = false"></stateful-notification-center-modal>
    </div>
  </div>
</template>
<script>
  import StatefulSoundPlayer from './sound/StatefulSoundPlayer.vue'
  import StatefulNotificationCenterModal from './notification/StatefulNotificationCenterModal.vue'
  import { listRecentNotificationsQuery as query } from '../../api/NotificationApi'
  import { mapNotification } from '../../func/mappers/mapNotification'
  import { notificationMethods } from '../methods/NotificationMethods'

  export default {
    components: {
      StatefulSoundPlayer,
      StatefulNotificationCenterModal,
    },
    props: {
      current: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        listNotifications: [],
        notificationCenterOpen: false,
      }
    },
    apollo: {
      listNotifications: {
        query,
        fetchPolicy: 'network-only',
        variables () {
          return { limit: 3 }
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
      menuItems () {
        return [
          {
            id: 'upload',
            href: { name: 'upload' },
            label: this.$t('Upload'),
          },
          {
            id: 'sounds',
            href: { name: (this.userIsAuthenticated ? 'home' : 'discover') },
            label: this.$t('Sounds'),
          },
          {
            id: 'profile',
            href: { name: 'profile-detail', params: { id: 'me' } },
            label: this.$t('Profile'),
          },
        ]
      },
    },
    methods: {
      openAuthor (item) {
        notificationMethods.openAuthor(this.$router, item)
      },
      openNotification (item) {
        notificationMethods.openNotification(this.$router, item)
      },
      openNotificationPage () {
        this.$refs.pureHeader.closeNotificationDropdown()
        this.notificationCenterOpen = true
      },
      doSearch (q) {
        this.$router.push({ name: 'search', query: { q } })
      },
    },
  }
</script>
