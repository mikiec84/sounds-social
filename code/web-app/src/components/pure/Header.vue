<template>
  <nav class="dt w-100 center bg-dark-blue">
    <div class="dtc v-mid pa3 w3">
      <router-link to="/" class="dib w2 h2 pa1 b--white-90 grow-large border-box">
        <!-- TODO: svg logo -->
        <svg class="link white-90 hover-white" data-icon="skull" viewBox="0 0 32 32" style="fill:currentcolor"><title>skull icon</title><path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"></path></svg>
      </router-link>
    </div>
    <div class="dtc v-mid pv3">
      <div class="dib ml3">
        <input-component placeholder="Search"></input-component>
      </div>
    </div>
    <div class="dtc v-mid tr pa3">
      <router-link
              v-for="item in menuItems"
              class="f6 fw4 no-underline dn dib-ns pv2 ph3"
              :class="{ 'white-70 hover-white': !isActive(item), 'white-40': isActive(item) }"
              :to="item.href"
              v-text="item.label"></router-link>
      <div class="pointer f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Logout</div>
    </div>
  </nav>
</template>
<script>
  import InputComponent from './Input.vue'

  export default {
    components: { InputComponent },
    props: {
      activeItemId: {
        type: String,
        required: true,
      },
    },
    methods: {
      isActive(item) {
        return this.activeItemId === item.id
      },
    },
    data() {
      return {
        menuItems: [
          {
            id: 'upload',
            href: '/upload',
            label: 'Upload',
          },
          {
            id: 'sounds',
            href: '/',
            label: 'Sounds',
          },
          {
            id: 'profile',
            href: '/profile/me',
            label: 'Profile',
          },
        ],
      }
    },
  }
</script>
