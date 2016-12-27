<template>
  <div>
    <div v-if="isLoggedIn">
      <layout-component>
        <div slot="header">
          <header-component active-item-id="sounds"></header-component>
        </div>
        <div slot="main">
          <h1 class="f-headline mv3">Sounds</h1>
          <div class="pb3"><sub-header-component :items="homeSubHeaderItems"></sub-header-component></div>
          <track-list-component
            :tracks="tracks"
            @open-track="$router.push('/tracks/fakeid')"
          ></track-list-component>
        </div>
        <div slot="sidebar">
          Hi Matteo!

          <p>Add List Filters (no repost)</p>
          <p>Other Infos</p>
        </div>
      </layout-component>
    </div>

    <div v-if="!isLoggedIn">
      <div class="bg-dark-blue white">
        <h1 class="f-headline lh-copy tc ma0 pv5">Sound Social</h1>
        <div class="mw8 center">
          <div class="lh-copy f3 ph3 pv4 tc">Join the community of artists and so on! Also get a better description</div>
        </div>
      </div>

      <div class="mw8 center tc">
        <div class="pv4">
          <login-component></login-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import LoginComponent from '../../stateful/LoginBox.vue'

  import TrackListComponent from '../../pure/track/TrackList.vue'
  import HeaderComponent from '../../pure/Header.vue'
  import SubHeaderComponent from '../../pure/SubHeader.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'

  // TODO: put TrackList with state into stateful component with apollo and implement infite scrolling logic
  // TODO: design pure TrackDetail.vue and ProfileSidebar.vue
  // TODO: brainstorm on monetization logic
  export default {
    components: {
      HeaderComponent,
      SubHeaderComponent,
      LayoutComponent,
      LoginComponent,
      TrackListComponent,
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
      tracks() {
        // TODO: use apollo client for mocked data
        return [
          {
            timeAgo: '20 minutes ago',
            label: 'My track',
            username: 'matteodem',
            waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
          },
          {
            timeAgo: '50 minutes ago',
            label: 'Another track',
            username: 'franz',
            waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
          },
          {
            timeAgo: '2 hours ago',
            label: 'Categorized',
            username: 'Insan3Lik3',
            waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
          },
          {
            timeAgo: '4 hours ago',
            label: 'Another one',
            username: 'Wow',
            waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
          },
        ]
      },
      isLoggedIn() {
        return true
      },
    },
  }
</script>
