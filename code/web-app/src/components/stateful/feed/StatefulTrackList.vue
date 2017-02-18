<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list-component
              @open-track="$router.push('/tracks/' + arguments[0].id)"
              :tracks="mapTracks(allTracks)"></track-list-component>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import TrackListComponent from '../../pure/track/TrackList.vue'

  // TODO: use moment to format createdAt

  const query = gql`
    query allFeedTracks {
      allTracks {
        id
        name
        description
        createdAt
        waveformSrc
        creator {
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
      allTracks: {
        query,
        loadingKey: 'loading',
      },
    },
    methods: {
      mapTracks(tracks) {
        return tracks.map(({ name, creator, createdAt, ...data }) => (
          {
            ...data,
            label: name,
            username: creator.username,
            timeAgo: createdAt,
          })
        )
      },
    },
  };
</script>
