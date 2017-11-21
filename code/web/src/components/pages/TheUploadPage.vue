<template>
  <layout-default>
    <div slot="header">
      <header-component current="upload"></header-component>
    </div>
    <div slot="main">
      <h1 class="f-headline mv3" v-text="$t('Upload')"></h1>

      <upload-box-component></upload-box-component>
    </div>
  </layout-default>
</template>
<script>
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import UploadBoxComponent from '../stateful/Upload/StatefulUploadBox.vue'

  export default {
    components: {
      HeaderComponent,
      UploadBoxComponent,
    },
    metaInfo () {
      return {
        title: this.$t('Upload'),
      }
    },
  }
</script>
