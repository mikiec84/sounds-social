<template>
  <div>
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <h1 class="f-headline mv3">Sounds</h1>
        <div class="pb3"><sub-header-component current="feed"></sub-header-component></div>
        <track-list-component></track-list-component>
      </div>
      <div slot="sidebar">
        Hi Matteo!

        <p>Add List Filters (no repost)</p>
        <p>Other Infos</p>
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script type="text/ecmascript-6">
  import TrackListComponent from '../../stateful/track/StatefulTrackList.vue'

  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import SubHeaderComponent from '../../stateful/sounds/StatefulSoundsSubHeader.vue'

  export default {
    components: {
      HeaderComponent,
      SubHeaderComponent,
      TrackListComponent,
    },
  }
</script>
