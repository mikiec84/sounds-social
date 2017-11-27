<template>
  <nav class="dt w-100 center bg-dark-blue">
    <div class="dtc v-mid pv2 ph3 ph1 ph3-l">
      <router-link to="/" class="dib v-mid w2 h2 b--white-90 grow-xlarge border-box" style="margin-bottom: 2px">
        <img src="/static/header_logo.png" />
      </router-link>
    </div>
    <div class="dtc v-mid pv3" style="width: 30%">
      <div class="dib ml3-l ml2 f6 f5-ns gray">
        <pure-input :value="searchQuery" @onEnter="$emit('search', arguments[0])" :placeholder="$t('Search')"></pure-input>
      </div>
    </div>
    <div class="dtc v-mid tr pa3-l pa1 white-70" style="width: 70%">
      <div v-if="isLoggedIn" class="dib mr1 mr3-ns">
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
      <router-link
              v-for="item in menuItems"
              :key="item.id"
              class="f6 fw4 no-underline pv2 ph3-l ph1"
              :class="{ 'color-inherit hover-white': !isActive(item), 'white-40': isActive(item) }"
              :to="item.href"
              v-text="item.label"></router-link>
      <div class="pointer f6 fw4 hover-white no-underline dn dib-ns mr2 mr0-l ml2 pv2 ph3 ba"
           v-if="isLoggedIn"
           @click="$emit('logout')"
           v-text="$t('Logout')"></div>
    </div>
  </nav>
</template>
<script>
  import {
    collectionHasNotificationFields,
    collectionHasMenuFields,
  } from '../../func/collectionHasFields'

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
      menuItems: {
        type: Array,
        validator: collectionHasMenuFields,
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
  }
</script>
