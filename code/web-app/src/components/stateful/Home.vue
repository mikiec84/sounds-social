<template>
  <div>
    <layout-component>
      <div slot="header">
        <header-component active-item-id="home"></header-component>
      </div>
      <div slot="main">
        wow
      </div>
      <div slot="sidebar">
        sidebar!
      </div>
    </layout-component>
  </div>
</template>
<script>
  import HeaderComponent from '../pure/Header.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: { HeaderComponent, LayoutComponent }
  }
</script>
