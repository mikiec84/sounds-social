<template>
  <!-- TODO add loading spinner -->
  <div>
    <div v-if="!loading">
      <sound-list
              @play-track="playTrack"
              @open-track="$router.push({ name: 'sound-detail', params: { id: arguments[0]._id } })"
              @open-profile="$router.push({ name: 'profile-detail', params: { id: arguments[0].creatorUserId } })"
              :tracks="mapTracks(listTrack)"></sound-list>

      <div v-if="!listTrack || !listTrack.length" v-text="$t('No sounds found')">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import { mapGraphlDataToSound } from '../../../func/createSound'
  import { keepAfter } from '../../../func/filter/keepAfter'

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

  // TODO: remove both userId and isDiscover params
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
      query: {
        type: Object,
        required: false,
        default () {
          return tracksQuery
        },
      },
      defineQueryVariables: {
        type: Function,
        required: false,
        default: (scope) => {
          const { isDiscover, userId } = scope

          return {
            userId: (userId || ''),
            loggedInFeed: !!userId || isDiscover ? '' : 'true',
          }
        },
      },
    },
    data: () => ({
      tracks: [],
      listTrack: [],
      loading: 0,
    }),
    apollo: {
      listTrack: {
        query () {
          return this.query
        },
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        variables () {
          console.log(this.defineQueryVariables(this))
          return this.defineQueryVariables(this)
        }
      },
    },
    methods: {
      playTrack (data) {
        const soundsToPlay = keepAfter(item => item._id === data._id)(this.listTrack)

        this.$store.dispatch('playFeedWithReset', {
          sounds: soundsToPlay.map(s => mapGraphlDataToSound(s)),
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
