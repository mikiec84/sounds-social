<template>
  <div class="avenir">
    <div v-if="isLoggedIn">
      <layout-component>
        <div slot="header">
          <header-component active-item-id="timeline"></header-component>
        </div>
        <div slot="main">
          <track-list-component :tracks="tracks"></track-list-component>
        </div>
        <div slot="sidebar">
          sidebar!
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
<script>
  import LoginComponent from './LoginBox.vue'

  import TrackListComponent from '../pure/track/TrackList.vue'
  import HeaderComponent from '../pure/Header.vue'
  import LayoutComponent from '../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: { HeaderComponent, LayoutComponent, LoginComponent, TrackListComponent },
    computed: {
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
        ]
      },
      isLoggedIn() {
        return true
      },
    },
  }
</script>
