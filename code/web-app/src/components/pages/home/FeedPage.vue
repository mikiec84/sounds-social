<template>
  <div>
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <h1 class="f-headline mv3">Sounds</h1>
        <div class="pb3"><sub-header-component :items="homeSubHeaderItems"></sub-header-component></div>
        <track-list-component v-if="userId" :userId="userId"></track-list-component>
      </div>
      <div slot="sidebar">
        Hi Matteo!

        <p>Add List Filters (no repost)</p>
        <p>Other Infos</p>
      </div>
    </layout-component>
  </div>
</template>
<script type="text/ecmascript-6">
  import { getUserId } from '../../../api/AuthApi'
  import TrackListComponent from '../../stateful/track/StatefulTrackList.vue'

  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import SubHeaderComponent from '../../pure/SubHeader.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: {
      HeaderComponent,
      SubHeaderComponent,
      LayoutComponent,
      TrackListComponent,
    },
    data() {
      return {
        userId: '',
      }
    },
    mounted() {
      getUserId().then(id => this.userId = id)
    },
    computed: {
      homeSubHeaderItems() {
        return [
          {
            label: 'Feed',
            href: '/',
            active: true,
          },
          {
            label: 'Discover',
            href: '/discover',
          },
          {
            label: 'Competitions',
            href: '/competitions',
          },
        ]
      },
    },
  }
</script>
