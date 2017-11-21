<template>
  <div>
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <h1 class="f-headline mv3">Sounds</h1>
        <div class="pb3"><sub-header-component current="discover"></sub-header-component></div>

        <div class="pv3">
          <div class="lh-copy f5">Discover all sounds on Sounds Social!</div>
        </div>
        <sound-list-component :isDiscover="true"></sound-list-component>
      </div>
      <div slot="sidebar">
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SoundListComponent from '../../stateful/sound/StatefulSoundList.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import SubHeaderComponent from '../../stateful/sounds/StatefulSoundsSubHeader.vue'

  export default {
    components: {
      HeaderComponent,
      SubHeaderComponent,
      SoundListComponent,
    },
    metaInfo () {
      return {
        title: this.$t('Discover'),
      }
    },
  }
</script>
