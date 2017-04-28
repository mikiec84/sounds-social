<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list-component
              @open-track="$router.push('/tracks/' + arguments[0]._id)"
              @open-profile="$router.push('/profile/' + arguments[0].creatorUserId)"
              :tracks="mapTracks(listTrack)"></track-list-component>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import TrackListComponent from '../../pure/track/TrackList.vue'

  // TODO: pass apollo query as param and create "FeedTrackList.vue" and "ProfileTrackList.vue"
  // TODO: use moment to format createdAt

  const userTracksQuery = gql`
    query ($userId: String!) {
      listTrack(filters: [{ key: "user", value: $userId }]) {
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

  const allTracksQuery = gql`
    query {
      listTrack {
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
    components: { TrackListComponent },
    props: {
      userId: {
        type: String,
        required: false,
      },
    },
    data: () => ({
      tracks: [],
      loading: 0,
    }),
    apollo: {
      listTrack: {
        query() {
          return this.userId ? userTracksQuery : allTracksQuery
        },
        loadingKey: 'loading',
        forceFetch: true,
        variables() {
          const { userId } = this

          return { userId }
        }
      },
    },
    methods: {
      mapTracks(tracks) {
        return tracks.map(({ name, creator, createdAt, ...data }) => (
          {
            ...data,
            label: name,
            creatorUserId: creator._id,
            username: creator.username,
            timeAgo: createdAt,
          })
        )
      },
    },
  };
</script>
