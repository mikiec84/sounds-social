<template>
  <header-component :active-item-id="current" @logout="doLogout()"></header-component>
</template>
<script type="text/ecmascript-6">
  export default {
    props: ['current'],
    methods: {
      doLogout () {
        this.$router.push('/')
        this.authLogOut().then(() => window.location.reload())
      },
    },
  }
</script>
