<template>
  <layout-component>
    <div slot="header">
      <header-component active-item-id="profile"></header-component>
    </div>
    <div slot="main">
      <p class="f4">for id: {{$route.params.id}}</p>
    </div>
    <div slot="sidebar">
      <div class="tc mv4">
        <div class="dib">
          <profile-image-component></profile-image-component>
        </div>
      </div>

      <div class="tc">
        <h1 class="f2 lh-copy">matteodem</h1>
      </div>

      Awesome sidebar! (add description and so on)
    </div>
  </layout-component>
</template>
<script>
  import HeaderComponent from '../pure/Header.vue'
  import ProfileImageComponent from '../pure/profile/ProfileImage.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: {
      HeaderComponent,
      ProfileImageComponent,
      LayoutComponent,
    },
  }
</script>
