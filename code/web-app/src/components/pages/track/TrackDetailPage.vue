<template>
  <div v-if="!loading">
    <layout-component>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="getTrack">
          <track-component
                  :time-ago="getTrack.createdAt"
                  :label="getTrack.name"
                  :description="getTrack.description"
                  :username="getTrack.creator.username"
                  @open-profile="$router.push('/profile/' + getTrack.creator._id)"
                  :no-border="true"
                  :waveform-src="getTrack.waveformSrc"></track-component>
        </div>

        <div v-if="!getTrack">
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
    query ($id: String!) {
      getTrack(_id: $id) {
        _id
        name
        description
        createdAt
        waveformSrc
        creator {
          _id
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
      getTrack: {
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
