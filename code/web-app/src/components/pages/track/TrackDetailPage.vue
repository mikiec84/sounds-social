<template>
  <div v-if="!loading">
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="Track">
          <track-component
                  :time-ago="Track.createdAt"
                  :label="Track.name"
                  :description="Track.description"
                  :username="Track.creator.username"
                  @open-profile="$router.push('/profile/' + Track.creator.auth0UserId)"
                  :no-border="true"
                  :waveform-src="Track.waveformSrc"></track-component>
        </div>

        <div v-if="!Track">
          Track not found!
        </div>
      </div>
      <div slot="sidebar">
        Awesome sidebar! (add meta info and so on)
      </div>
    </layout-component>
  </div>
</template>
<script>
  import gql from 'graphql-tag'

  import TrackComponent from '../../pure/track/Track.vue'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'

  const query = gql`
    query ($id: ID!) {
      Track(id: $id) {
        id
        name
        description
        createdAt
        waveformSrc
        creator {
          auth0UserId
          username
        }
      }
    }
  `

  export default {
    components: {
      TrackComponent,
      LayoutComponent,
      HeaderComponent,
    },
    data() {
      return {
        loading: 0,
      }
    },
    apollo: {
      Track: {
        query: query,
        loadingKey: 'loading',
        variables() {
          return {
            id: this.$route.params.id,
          }
        }
      }
    },
  };
</script>
