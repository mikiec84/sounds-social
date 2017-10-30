<template>
  <layout-component>
    <div slot="header">
      <header-component current="upload"></header-component>
    </div>
    <div slot="main">
      <h1 class="f-headline mv3">Upload</h1>

      <upload-box-component></upload-box-component>
    </div>
  </layout-component>
</template>
<script>
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import LayoutComponent from '../pure/layout/Layout.vue'
  import UploadBoxComponent from '../stateful/Upload/StatefulUploadBox.vue'

  export default {
    components: {
      HeaderComponent,
      LayoutComponent,
      UploadBoxComponent,
    },
  }
</script>
