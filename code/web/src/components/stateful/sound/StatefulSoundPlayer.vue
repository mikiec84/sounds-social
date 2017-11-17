<template>
  <sound-player
    :isPlaying="$store.state.soundPlayer.isPlaying"
    :isMuted="$store.state.soundPlayer.isMuted"
    :mode="$store.state.soundPlayer.mode"
    :current="$store.state.soundPlayer.currentId"
    :sounds="$store.getters.soundPlayerSounds"
    :playingTime="$store.getters.soundPlayingTime"
    :timeLineProgress="$store.getters.seekRelativeDecimal"
    :listVisible="$store.state.soundPlayer.playerPlayingNowVisible"

    @openSound="openSound(arguments[0])"
    @openProfile="openProfile(arguments[0])"
    @playSound="playSound(arguments[0])"
    @removeSound="removeSound(arguments[0])"
    @moveSound="moveSound(arguments[0], arguments[1])"

    @openList="openPlayerList"
    @closeList="closePlayerList"

    @play="playCurrent"
    @pause="pauseCurrent"
    @stepForward="stepForward"
    @stepBackward="stepBackward"
    @seek="$store.dispatch('playerSeekRelativeDecimal', arguments[0])"

    @randomize="changeRandomMode(arguments[0])"
    @loop="changeLoopMode(arguments[0])"
    @loopSingle="changeLoopSingleMode(arguments[0])"

    @mute="mutePlayer"
    @unmute="unmutePlayer"
  ></sound-player>
</template>
<script>
  import Mousetrap from 'mousetrap'
  import { RANDOM_MODE, LOOP_SINGLE_MODE, LOOP_MODE } from '../../../constants/PlayerConstants'
  import { onPlayerEvent } from '../../../func/SoundPlayer'

  const changeModeOrReset = (doChange, store, mode) => store.dispatch('changePlayerMode', (doChange ? { mode } : ''))

  export default {
    created () {
      onPlayerEvent((event, data) => {
        if (event === 'done') this.$store.dispatch('changeSoundAfterFinished')
        if (event === 'soundPosition') this.$store.dispatch('changeSoundPosition', data)
      })

      const { state } = this.$store

      Mousetrap.bind('space', e => {
        e.preventDefault()

        if (state.soundPlayer.isPlaying) this.pauseCurrent()
        else this.playCurrent()
      })
      Mousetrap.bind('m', () => {
        if (state.soundPlayer.isMuted) this.unmutePlayer()
        else this.mutePlayer()
      })
      Mousetrap.bind('shift+w', () => {
        if (state.soundPlayer.playerPlayingNowVisible) this.closePlayerList()
        else this.openPlayerList()
      })
      Mousetrap.bind('shift+right', this.stepForward)
      Mousetrap.bind('shift+left', this.stepBackward)
      Mousetrap.bind('shift+r', () => this.changeRandomMode(true))
      Mousetrap.bind('shift+l', () => this.changeLoopMode(true))
      Mousetrap.bind('shift+s', () => this.changeLoopSingleMode(true))
      Mousetrap.bind('shift+n', this.resetMode)
    },
    methods: {
      playCurrent () {
        this.$store.dispatch('play')
      },
      pauseCurrent () {
        this.$store.dispatch('pause')
      },
      mutePlayer () {
        this.$store.dispatch('mutePlayer')
      },
      unmutePlayer () {
        this.$store.dispatch('unmutePlayer')
      },
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
      moveSound (soundId, relativePosition) {
        this.$store.dispatch('moveSound', { soundId, relativePosition })
      },
      openPlayerList () {
        this.$store.dispatch('openPlayerPlayingNowList')
      },
      closePlayerList () {
        this.$store.dispatch('closePlayerPlayingNowList')
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
      resetMode () {
        this.$store.dispatch('changePlayerMode', { mode: '' })
      },
      stepForward () {
        this.$store.dispatch('playerStepForward')
      },
      stepBackward () {
        this.$store.dispatch('playerStepBackward')
      },
    },
  }
</script>
