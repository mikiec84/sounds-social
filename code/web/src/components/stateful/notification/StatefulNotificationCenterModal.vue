<template>
  <pure-modal @close="$emit('close')">
    <div class="pa4">
      <h1 class="f1 mt2 mb3" v-text="$t('Notification Center')"></h1>
      <pure-notification-list
        :grid="true"
        :detailed="true"
        :notifications="notificationList"
        @openAuthor="openAuthor"
        @openNotification="openNotification"
      ></pure-notification-list>
    </div>
  </pure-modal>
</template>
<script>
  import { listRecentNotificationsQuery as query } from '../../../api/NotificationApi'
  import { mapNotification } from '../../../func/mappers/mapNotification'
  import { notificationMethods } from '../../methods/NotificationMethods'

  export default {
    data () {
      return {
        listNotifications: [],
      }
    },
    apollo: {
      listNotifications: {
        query,
        fetchPolicy: 'network-only',
      },
    },
    computed: {
      notificationList () {
        return this.listNotifications.map(mapNotification)
      },
    },
    methods: {
      openAuthor (item) {
        notificationMethods.openAuthor(this.$router, item)
        this.$emit('close')
      },
      openNotification (item) {
        notificationMethods.openNotification(this.$router, item)
        this.$emit('close')
      },
    },
  }
</script>
