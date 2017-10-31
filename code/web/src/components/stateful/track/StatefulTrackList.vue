<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list
              @open-track="$router.push('/tracks/' + arguments[0]._id)"
              @open-profile="$router.push('/profile/' + arguments[0].creatorUserId)"
              :tracks="mapTracks(listTrack)"></track-list>

      <div v-if="!listTrack || !listTrack.length">
        No tracks found.
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'

  // TODO: pass apollo query as param and create "FeedTrackList.vue" and "ProfileTrackList.vue"
  // TODO: use moment to format createdAt

  const tracksQuery = gql`
    query TrackListQuery($userId: String!, $loggedInFeed: String!) {
      listTrack(filters: [{ key: "user", value: $userId }, { key: "loggedInFeed", value: $loggedInFeed }]) {
        _id
        name
        coverFile
        description
        createdAt
        fileUrl
        creator {
          _id
          username
        }
      }
    }
  `

  export default {
    props: {
      userId: {
        type: String,
        required: false,
      },
      isDiscover: {
        type: Boolean,
        required: false,
      },
    },
    data: () => ({
      tracks: [],
      listTrack: [],
      loading: 0,
    }),
    apollo: {
      listTrack: {
        query: tracksQuery,
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        variables () {
          const { isDiscover, userId } = this

          return {
            userId: (userId || ''),
            loggedInFeed: !!userId || isDiscover ? '' : 'true',
          }
        }
      },
    },
    methods: {
      mapTracks (tracks) {
        return (tracks || []).map(({ name, creator, createdAt, ...data }) => (
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
  }
</script>
