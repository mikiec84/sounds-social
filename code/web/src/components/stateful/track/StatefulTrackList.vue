<template>
  <!-- TODO add loading spinner? -->
  <div>
    <div v-if="!loading">
      <track-list
              @play-track="playTrack"
              @open-track="$router.push({ name: 'sound-detail', params: { id: arguments[0]._id } })"
              @open-profile="$router.push({ name: 'profile-detail', params: { id: arguments[0].creatorUserId } })"
              :tracks="mapTracks(listTrack)"></track-list>

      <div v-if="!listTrack || !listTrack.length" v-text="$t('No sounds found')">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import { find } from 'lodash/fp'
  import { mapGraphlDataToSound } from '../../../lib/createSound'

  // TODO: pass apollo query as param and create "FeedTrackList.vue" and "ProfileTrackList.vue"
  // TODO: use moment to format createdAt

  const tracksQuery = gql`
    query TrackListQuery($userId: String!, $loggedInFeed: String!) {
      listTrack(filters: [{ key: "user", value: $userId }, { key: "loggedInFeed", value: $loggedInFeed }]) {
        _id
        name
        coverFile {
          url
        }
        description
        createdAt
        file {
          url
        }
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
      playTrack (data) {
        this.$store.dispatch('playWithReset', {
          sound: mapGraphlDataToSound(
            find(track => track._id === data._id)(this.listTrack)
          ),
        })
      },
      mapTracks (tracks) {
        return (tracks || []).map(({ name, creator, createdAt, ...data }) => (
          {
            ...data,
            label: name,
            creatorUserId: creator._id,
            username: creator.username,
            timeAgo: createdAt,
            creator: creator,
          })
        )
      },
    },
  }
</script>
