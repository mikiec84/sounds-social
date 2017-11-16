<template>
  <nav class="dt w-100 center bg-dark-blue">
    <div class="dtc v-mid pa3 w3">
      <router-link to="/" class="dib w2 h2 pa1 b--white-90 grow-large border-box">
        <!-- TODO: svg logo -->
        <svg class="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg>
      </router-link>
    </div>
    <div class="dtc v-mid pv3">
      <div class="dib ml3-l ml2">
        <input-component :placeholder="$t('Search')"></input-component>
      </div>
    </div>
    <div class="dtc v-mid tr pa3-l pa1 white-70">
      <router-link
              v-for="item in menuItems"
              :key="item.id"
              class="f6 fw4 no-underline pv2 ph3-l ph2"
              :class="{ 'hover-white': !isActive(item), 'white-40': isActive(item) }"
              :to="item.href"
              v-text="item.label"></router-link>
      <div v-if="isLoggedIn" class="dib ml1 mr3">
        <pure-menu-dropdown
          icon="bell"
          dropdownKey="notifications"
        >
          <div class="tl pa2">
            <div class="tc pv2" v-if="$_.isEmpty(notifications)" v-text="$t('No notifications')"></div>
            <div v-if="!$_.isEmpty(notifications)">
              <div v-for="item in notifications" :key="item.id">
                <div class="pointer db cf mv2 pv2" @click="$emit('openNotification', item)">
                  <div class="fl w-20">
                    <div class="contain bg-center w-100" :style="`height: 40px; background-image: url(${item.imageUrl})`"></div>
                  </div>
                  <div class="fl w-80 pl2">
                    <div class="f6 lh-title black-80" v-text="item.content"></div>
                  </div>
                </div>
              </div>
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
