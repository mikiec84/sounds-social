<template>
  <div :class="['ba b--black-20 pa2', { 'gray': !hasSounds }]">
    <div class="cf">
      <div class="fl w-40">
        <div v-if="currentSound">
          <div>
            <sound-player-button @click="playingNowVisible = !playingNowVisible" icon="angle-down"></sound-player-button>
            <div class="dib pointer" @click="$emit('openSound', currentSound.id)">
              <div class="b" v-text="currentSound.title"></div>
            </div>
          </div>

          <div v-if="playingNowVisible" class="relative">
            <div class="absolute bg-white b--black-20 br bl bb" style="width: 300px; left: -9px; top: 8px">
              <sound-player-list
                :sounds="sounds"
                :currentSound="currentSound"
                :isPlaying="isPlaying"
                @play="$emit('play')"
                @pause="$emit('pause')"
                @openSound="$emit('openSound', arguments[0])"
                @playSound="$emit('playSound', arguments[0])"
                @openProfile="$emit('openProfile', arguments[0])"
              ></sound-player-list>
            </div>
          </div>
        </div>
        <div v-if="!currentSound">
          <div class="i" v-text="$t('No sound selected')"></div>
        </div>
      </div>
      <div class="fl w-20 f5">
        <sound-player-button icon="step-backward"
                             @click="$emit('stepBackward')"
                             :disabled="!hasSounds || firstPlaying"></sound-player-button>
        <sound-player-button :icon="isPlaying ? 'pause' : 'play'"
                             @click="$emit(isPlaying ? 'pause' : 'play')"
                             :disabled="!hasSounds"></sound-player-button>
        <sound-player-button icon="step-forward"
                             @click="$emit('stepForward')"
                             :disabled="!hasSounds || lastPlaying"></sound-player-button>
      </div>
      <div class="fl w-20">
        <sound-player-button icon="random"
                             @click="$emit('randomize', !inRandomMode)"
                             :disabled="!hasSounds"
                             :inactive="!inRandomMode"></sound-player-button>
        <div class="dib">
          <sound-player-button icon="repeat"
                               @click="changeLoopMode"
                               :disabled="!hasSounds"
                               :inactive="!inLoopMode && !inLoopSingleMode"></sound-player-button>
          <div class="relative" v-if="inLoopSingleMode">
            <div class="absolute f7 b pointer" @click="changeLoopMode" style="bottom: 10px;left: 14px">
              1
            </div>
          </div>
        </div>
      </div>
      <div class="fl w-20">
        <div :class="[{ 'gray': isMuted }]">
          <sound-player-button :icon="isMuted ? 'volume-off' : 'volume-up'"
                               @click="$emit(isMuted ? 'unmute' : 'mute')"
                               :disabled="!hasSounds"></sound-player-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { find, cond, matches } from 'lodash/fp'
  import { collectionHasPlaylistFields } from '../../../lib/collectionHasFields'
  import { RANDOM_MODE, LOOP_SINGLE_MODE, LOOP_MODE, isValidMode } from '../../../constants/PlayerConstants'

  export default {
    props: {
      sounds: {
        type: Array,
        required: true,
        validator: collectionHasPlaylistFields,
      },
      isPlaying: {
        type: Boolean,
        required: false,
        default: false,
      },
      isMuted: {
        type: Boolean,
        required: false,
        default: false,
      },
      current: {
        type: String,
        required: false,
      },
      mode: {
        type: String,
        required: false,
        validator: isValidMode,
      }
    },
    data () {
      return {
        playingNowVisible: false,
      }
    },
    computed: {
      hasSounds () {
        return this.sounds.length > 0
      },
      currentSound () {
        return find({ id: this.current })(this.sounds)
      },
      firstPlaying () {
        return this.currentSound.id === this.sounds[0].id
      },
      lastPlaying () {
        return this.currentSound.id === this.sounds[this.sounds.length - 1].id
      },
      inRandomMode () {
        return this.mode === RANDOM_MODE
      },
      inLoopMode () {
        return this.mode === LOOP_MODE
      },
      inLoopSingleMode () {
        return this.mode === LOOP_SINGLE_MODE
      },
    },
    methods: {
      changeLoopMode () {
        return cond([
          [matches({ inLoopMode: false, inLoopSingleMode: false }), () => this.$emit('loop', true)],
          [matches({ inLoopMode: true }), () => this.$emit('loopSingle', true)],
          [matches({ inLoopSingleMode: true }), () => this.$emit('loopSingle', false)],
        ])({ inLoopMode: this.inLoopMode, inLoopSingleMode: this.inLoopSingleMode })
      },
    },
  }
</script>
