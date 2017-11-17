<template>
  <!-- TODO add loading spinner -->
  <div>
    <div v-if="!loading">
      <sound-list
              @play-sound="playSound"
              @open-sound="$router.push({ name: 'sound-detail', params: { id: arguments[0]._id } })"
              @open-profile="$router.push({ name: 'profile-detail', params: { id: arguments[0].creatorUserId } })"
              :sounds="mapSounds(listSound)"></sound-list>

      <div v-if="!listSound || !listSound.length" v-text="$t('No sounds found')">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import gql from 'graphql-tag'
  import { mapGraphlDataToSound } from '../../../func/mappers/mapSound'
  import { keepAfter } from '../../../func/filter/keepAfter'

  const soundsQuery = gql`
    query SoundListQuery($userId: String!, $loggedInFeed: String!) {
      listSound(filters: [{ key: "user", value: $userId }, { key: "loggedInFeed", value: $loggedInFeed }]) {
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
          return soundsQuery
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
      sounds: [],
      listSound: [],
      loading: 0,
    }),
    apollo: {
      listSound: {
        query () {
          return this.query
        },
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
        variables () {
          return this.defineQueryVariables(this)
        }
      },
    },
    methods: {
      playSound (data) {
        const soundsToPlay = keepAfter(item => item._id === data._id)(this.listSound)

        this.$store.dispatch('playFeedWithReset', {
          sounds: soundsToPlay.map(s => mapGraphlDataToSound(s)),
        })
      },
      mapSounds (sounds) {
        return (sounds || []).map(({ name, creator, createdAt, ...data }) => (
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
