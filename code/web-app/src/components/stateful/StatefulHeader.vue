<template>
  <header-component :active-item-id="current" @logout="authLogOut()"></header-component>
</template>
<script>
  import HeaderComponent from '../pure/Header.vue'

  export default {
    props: ['current'],
    components: { HeaderComponent },
  }
</script>
