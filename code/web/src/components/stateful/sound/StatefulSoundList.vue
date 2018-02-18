<template>
  <div>
    <pure-loader-transition :is-loading="loading">
      <div slot="loader">
        <pure-loader-sound-list></pure-loader-sound-list>
      </div>
      <div slot="content">
        <sound-list
          @play-sound="playSound"
          @open-sound="$router.push({ name: 'sound-detail', params: { id: arguments[0]._id } })"
          @open-profile="$routeNavigator.openProfile(arguments[0].creatorUserId, arguments[0].ownerType)"
          :sounds="mapSounds(listSound)"></sound-list>

        <div v-if="!listSound || !listSound.length" v-text="$t('No sounds found')"></div>
      </div>
    </pure-loader-transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import { listSoundDefaultQuery as soundsQuery } from '../../../api/SoundApi'
  import { mapGraphlDataToSound } from '../../../func/mappers/mapSound'
  import { keepAfter } from '../../../func/filter/keepAfter'

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
        return (sounds || []).map(({ name, isPublic, creator, createdAt, ...data }) => (
          {
            ...data,
            label: name,
            creatorUserId: creator._id,
            username: creator.username,
            timeAgo: createdAt.fromNow,
            creator: creator,
            isPrivate: !isPublic,
          })
        )
      },
    },
  }
</script>
