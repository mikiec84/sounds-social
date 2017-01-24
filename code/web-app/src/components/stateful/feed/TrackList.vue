<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list-component
              @open-track="$router.push('/tracks/fakeid')"
              :tracks="tracks"></track-list-component>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import TrackListComponent from '../../pure/track/TrackList.vue'

  const query = gql`
    query allFeedTracks {
      feedTracks {
        id
        name
        uploadedAt
        uploader {
          username
        }
      }
    }
  `

  export default {
    components: { TrackListComponent },
    data: () => ({
      tracks: [],
      loading: 0,
    }),
    apollo: {
      tracks: {
        query,
        loadingKey: 'loading',
      },
    },
  };
</script>
