<template>
  <layout-component>
    <div slot="header">
      <header-component current="upload"></header-component>
    </div>
    <div slot="main">
      <h1 class="f-headline mv3">Upload</h1>

      <upload-form-component></upload-form-component>
    </div>
  </layout-component>
</template>
<script>
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import LayoutComponent from '../pure/layout/Layout.vue'
  import UploadFormComponent from '../stateful/Upload/StatefulUploadForm.vue'

  export default {
    components: {
      HeaderComponent,
      LayoutComponent,
      UploadFormComponent,
    },
  }
</script>
