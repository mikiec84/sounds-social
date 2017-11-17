<template>
  <nav class="dt w-100 center bg-dark-blue">
    <div class="dtc v-mid pa3 w3">
      <router-link to="/" class="dib w2 h2 pa1 b--white-90 grow-large border-box">
        <!-- TODO: svg logo -->
        <svg class="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg>
      </router-link>
    </div>
    <div class="dtc v-mid pv3">
      <div class="dib ml3-l ml2 gray">
        <pure-input :value="searchQuery" @onEnter="$emit('search', arguments[0])" :placeholder="$t('Search')"></pure-input>
      </div>
    </div>
    <div class="dtc v-mid tr pa3-l pa1 white-70">
      <router-link
              v-for="item in menuItems"
              :key="item.id"
              class="f6 fw4 no-underline pv2 ph3-l ph2"
              :class="{ 'color-inherit hover-white': !isActive(item), 'white-40': isActive(item) }"
              :to="item.href"
              v-text="item.label"></router-link>
      <div v-if="isLoggedIn" class="dib ml1 mr3">
        <pure-menu-dropdown
          icon="bell"
          dropdownKey="notifications"
          ref="notificationMenuDropdownEl"
        >
          <div class="tl pa2">
            <div class="tc pv2" v-if="$_.isEmpty(notifications)" v-text="$t('No notifications')"></div>
            <div v-if="!$_.isEmpty(notifications)">
              <pure-notification-list
                @openAuthor="$emit('openAuthor', arguments[0])"
                @openNotification="$emit('openNotification', arguments[0])"
                :notifications="notifications"></pure-notification-list>
              <div class="pointer black tc pv2 dim f7 b" @click="$emit('openNotificationPage')" v-text="$t('Open notification center')"></div>
            </div>
          </div>
        </pure-menu-dropdown>
      </div>
      <div class="pointer f6 fw4 hover-white no-underline dn dib-l ml2 pv2 ph3 ba"
           v-if="isLoggedIn"
           @click="$emit('logout')"
           v-text="$t('Logout')"></div>
    </div>
  </nav>
</template>
<script>
  import { collectionHasNotificationFields } from '../../func/collectionHasFields'

  export default {
    props: {
      activeItemId: {
        type: String,
        required: true,
      },
      isLoggedIn: {
        type: Boolean,
        default: false,
      },
      searchQuery: {
        type: String,
        required: false,
        default: '',
      },
      notifications: {
        type: Array,
        required: false,
        validator: collectionHasNotificationFields,
      },
    },
    methods: {
      isActive (item) {
        return this.activeItemId === item.id
      },
      closeNotificationDropdown () {
        this.$refs.notificationMenuDropdownEl.closePopover()
      },
    },
    data () {
      return {
        menuItems: [
          {
            id: 'upload',
            href: '/upload',
            label: this.$t('Upload'),
          },
          {
            id: 'sounds',
            href: '/sounds',
            label: 'Sounds',
          },
          {
            id: 'profile',
            href: '/profile/me',
            label: this.$t('Profile'),
          },
        ],
      }
    },
  }
</script>
