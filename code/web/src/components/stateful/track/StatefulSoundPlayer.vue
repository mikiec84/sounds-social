<template>
  <sound-player
    :isPlaying="$store.state.soundPlayer.isPlaying"
    :isMuted="$store.state.soundPlayer.isMuted"
    :mode="$store.state.soundPlayer.mode"
    :current="$store.state.soundPlayer.currentId"
    :sounds="$store.state.soundPlayer.sounds"

    @openSound="openSound(arguments[0])"
    @openProfile="openProfile(arguments[0])"
    @playSound="playSound(arguments[0])"

    @play="$store.dispatch('play')"
    @pause="$store.dispatch('pause')"
    @stepForward="$store.dispatch('playerStepForward')"
    @stepBackward="$store.dispatch('playerStepBackward')"

    @randomize="changeRandomMode(arguments[0])"
    @loop="changeLoopMode(arguments[0])"
    @loopSingle="changeLoopSingleMode(arguments[0])"

    @mute="$store.dispatch('mutePlayer')"
    @unmute="$store.dispatch('unmutePlayer')"
  ></sound-player>
</template>
<script>
  import { RANDOM_MODE, LOOP_SINGLE_MODE, LOOP_MODE } from '../../../constants/PlayerConstants'

  const changeModeOrReset = (doChange, store, mode) => store.dispatch('changePlayerMode', (doChange ? { mode } : ''))

  export default {
    methods: {
      openSound(soundId) {
        this.$emit('openSound', soundId)
      },
      openProfile(profileId) {
        this.$emit('openProfile', profileId)
      },
      playSound(soundId) {
        this.$store.dispatch('changeSoundToPlay', { soundId })
      },
      changeRandomMode(doChange) {
        changeModeOrReset(doChange, this.$store, RANDOM_MODE)
      },
      changeLoopMode(doChange) {
        changeModeOrReset(doChange, this.$store, LOOP_MODE)
      },
      changeLoopSingleMode(doChange) {
        changeModeOrReset(doChange, this.$store, LOOP_SINGLE_MODE)
      },
    },
  }
</script>
