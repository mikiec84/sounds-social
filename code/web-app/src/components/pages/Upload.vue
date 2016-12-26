<template>
  <layout-component>
    <div slot="header">
      <header-component active-item-id="upload"></header-component>
    </div>
    <div slot="main">
      <h1 class="f-headline mv3">Upload</h1>
    </div>
  </layout-component>
</template>
<script>
  import HeaderComponent from '../pure/Header.vue'
  import LayoutComponent from '../pure/layout/Layout.vue'

  export default {
    components: { HeaderComponent, LayoutComponent },
  }
</script>
