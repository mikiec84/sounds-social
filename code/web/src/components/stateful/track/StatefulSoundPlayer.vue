<template>
  <sound-player
    :isPlaying="$store.state.soundPlayer.isPlaying"
    :isMuted="$store.state.soundPlayer.isMuted"
    :mode="$store.state.soundPlayer.mode"
    :current="$store.state.soundPlayer.currentId"
    :sounds="$store.getters.soundPlayerSounds"
    :playingTime="$store.getters.soundPlayingTime"
    :timeLineProgress="$store.getters.soundTimeLineProgress"

    @openSound="openSound(arguments[0])"
    @openProfile="openProfile(arguments[0])"
    @playSound="playSound(arguments[0])"
    @removeSound="removeSound(arguments[0])"

    @play="$store.dispatch('play')"
    @pause="$store.dispatch('pause')"
    @stepForward="stepForward"
    @stepBackward="$store.dispatch('playerStepBackward')"
    @seek="$store.dispatch('playerSeekRelativeDecimal', arguments[0])"

    @randomize="changeRandomMode(arguments[0])"
    @loop="changeLoopMode(arguments[0])"
    @loopSingle="changeLoopSingleMode(arguments[0])"

    @mute="$store.dispatch('mutePlayer')"
    @unmute="$store.dispatch('unmutePlayer')"
  ></sound-player>
</template>
<script>
  import { RANDOM_MODE, LOOP_SINGLE_MODE, LOOP_MODE } from '../../../constants/PlayerConstants'
  import { onPlayerEvent } from '../../../lib/SoundPlayer'

  const changeModeOrReset = (doChange, store, mode) => store.dispatch('changePlayerMode', (doChange ? { mode } : ''))

  export default {
    created () {
      onPlayerEvent((event, data) => {
        if (event === 'done') this.$store.dispatch('changeSoundAfterFinished')
        if (event === 'trackPosition') this.$store.dispatch('changeSoundPosition', data)
      })
    },
    methods: {
      openSound (soundId) {
        this.$emit('openSound', soundId)
      },
      openProfile (profileId) {
        this.$emit('openProfile', profileId)
      },
      playSound (soundId) {
        this.$store.dispatch('changeSoundToPlay', { soundId })
      },
      removeSound (soundId) {
        this.$store.dispatch('removeSound', { soundId })
      },
      changeRandomMode (doChange) {
        changeModeOrReset(doChange, this.$store, RANDOM_MODE)
      },
      changeLoopMode (doChange) {
        changeModeOrReset(doChange, this.$store, LOOP_MODE)
      },
      changeLoopSingleMode (doChange) {
        changeModeOrReset(doChange, this.$store, LOOP_SINGLE_MODE)
      },
      stepForward () {
        this.$store.dispatch('playerStepForward')
      },
    },
  }
</script>
