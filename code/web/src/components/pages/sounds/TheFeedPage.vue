<template>
  <div>
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <pure-title v-text="$t('Sounds')"></pure-title>
        <div class="pb3"><sub-header-component current="feed"></sub-header-component></div>
        <sound-list-component></sound-list-component>
      </div>
      <div slot="sidebar">
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SoundListComponent from '../../stateful/sound/StatefulSoundList.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import SubHeaderComponent from '../../stateful/sound/StatefulSoundsSubHeader.vue'

  export default {
    components: {
      HeaderComponent,
      SubHeaderComponent,
      SoundListComponent,
    },
  }
</script>
