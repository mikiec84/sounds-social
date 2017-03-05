<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list-component
              @open-track="$router.push('/tracks/' + arguments[0].id)"
              @open-profile="$router.push('/profile/' + arguments[0].creatorUserId)"
              :tracks="mapTracks(allTracks)"></track-list-component>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import TrackListComponent from '../../pure/track/TrackList.vue'

  // TODO: pass apollo query as param and create "FeedTrackList.vue" and "ProfileTrackList.vue"
  // TODO: use moment to format createdAt

  const userTracksQuery = gql`
    query ($userId: String) {
      allTracks(orderBy: createdAt_ASC, filter:{ creator: { auth0UserId: $userId } }) {
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

  const allTracksQuery = gql`
    query {
      allTracks(orderBy: createdAt_ASC) {
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
      allTracks: {
        query() {
          return this.userId ? userTracksQuery : allTracksQuery
        },
        loadingKey: 'loading',
        forceFetch: true,
        variables() {
          const { userId } = this
          console.log(userId)
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
            creatorUserId: creator.auth0UserId,
            username: creator.username,
            timeAgo: createdAt,
          })
        )
      },
    },
  };
</script>
