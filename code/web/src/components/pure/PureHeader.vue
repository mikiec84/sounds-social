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
  import { collectionHasMenuFields } from '../../func/collectionHasFields'

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
      menuItems: {
        type: Array,
        validator: collectionHasMenuFields,
      },
    },
    methods: {
      isActive (item) {
        return this.activeItemId === item.id
      },
    },
  }
</script>
