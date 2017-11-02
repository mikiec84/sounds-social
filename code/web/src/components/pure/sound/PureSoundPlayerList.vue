<template>
  <div class="bg-white b--black-20 br bl bb">
    <div v-for="sound in sounds" :key="sound.id" class="pa2">
      <div class="cf">
        <div class="fl w-20">
          <div class="cover pointer"
               @click="$emit('openSound', sound.id)"
               :style="`width: 50px; height: 50px; background-image: url('${sound.cover}')`"></div>
        </div>
        <div class="fl w-70" style="margin-top: 8px">
          <div :class="['f5  pointer', { 'b': isCurrentSound(sound) }]"
               @click="$emit('openSound', sound.id)"
               v-text="sound.title"></div>
          <div class="f6 gray mt1" @click="$emit('openProfile', sound.byId)">
            <span class="pointer" v-text="$t('by')"></span> <span class="pointer" v-text="sound.by"></span>
          </div>
        </div>
        <div class="fl w-10">
          <div style="margin-top: 16px"
               class="hover-black gray pointer"
               @click="playOrPauseSound(sound)">
            <icon-component :icon="isCurrentSound(sound) && isPlaying ? 'pause' : 'play'"></icon-component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      sounds: {
        type: Array,
      },
      currentSound: {
        type: Object,
      },
      isPlaying: {
        type: Boolean,
      },
    },
    methods: {
      isCurrentSound (sound) {
        return this.currentSound.id === sound.id
      },
      playOrPauseSound (sound) {
        this.isCurrentSound(sound) && this.isPlaying ? this.$emit('pause') : this.playCurrentOrNewSound(sound)
      },
      playCurrentOrNewSound (sound) {
        this.$emit((this.isCurrentSound(sound) ? 'play' : 'playSound'), sound.id)
      },
    },
  }
</script>
