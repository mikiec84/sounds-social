<template>
  <header-component :active-item-id="current" @logout="doLogout()"></header-component>
</template>
<script type="text/ecmascript-6">
  import HeaderComponent from '../pure/Header.vue'

  export default {
    props: ['current'],
    components: { HeaderComponent },
    methods: {
      doLogout () {
        this.$router.push('/')
        this.authLogOut().then(() => window.location.reload())
      },
    },
  }
</script>
