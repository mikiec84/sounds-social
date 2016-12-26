<template>
  <layout-component>
    <div slot="header">
      <header-component active-item-id="profile"></header-component>
    </div>
    <div slot="main">
      <h1 class="f-headline mv3">Profile</h1>

      <p class="f4">for id: {{$route.params.id}}</p>
    </div>
    <div slot="sidebar">
      Awesome sidebar! (add picture and so on)
    </div>
  </layout-component>
</template>
<script>
  import HeaderComponent from '../pure/Header.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: { HeaderComponent, LayoutComponent },
  }
</script>
