<template>
  <div id="app" class="bg-white min-vh-100" v-cloak>
    <router-view></router-view>
  </div>
</template>
<script>
  import 'tachyons/css/tachyons.css'
  import './styles/index.scss'
  import 'font-awesome/css/font-awesome.css'

  export default {
    metaInfo () {
      return {
        title: '...',
        titleTemplate: '%s | Sounds Social',
        htmlAttrs: {
          lang: this.$i18nUserLanguage,
        },
      }
    },
  }
</script>
