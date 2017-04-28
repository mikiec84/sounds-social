<template>
  <div>
    <div :class="{ 'ba bw1 b--light-gray br2': !noBorder  }" class="ph3 mw8">
      <div class="pointer">
        <div class="dib v-mid pr2">
          <i class="fa fa-play" aria-hidden="true"></i>
        </div>
        <h2 @click="$emit('open-track')" class="lh-copy f3 b dib v-mid black mv2 dim navy " v-text="label"></h2>
      </div>
      <div class="description username f5 gray"><span class="black-50">{{timeAgo}}</span> by <span class="dim pointer" @click="$emit('open-profile')">{{username}}</span></div>
      <div class="mt3 pointer">
        <div
                @click="$emit('open-track', $event.layerX / 760)"
                v-if="playingPos > 0" class="relative" style="width: 760px">
          <div class="bg-white absolute o-70" :style="`width: ${playingPos * 100}%; height: 120px`"></div>
        </div>
        <track-waveform @seekSound="$emit('open-track', arguments[0])" :fileUrl="fileUrl"></track-waveform>
        <div class="mt4">
          <div v-if="isPlaying">
            <span class="i" :class="{ 'o-50': playingPos > 0 }">Currently playing 🔉</span>
            <span class="pointer b" @click="$emit('pauseTrack')">Pause</span>
          </div>
          <div v-if="!isPlaying">
            <span class="pointer b" @click="$emit('open-track')">Play Track 🎵</span>
          </div>
        </div>
      </div>

      <div v-if="description" class="mt4 f5 black-80 lh-copy measure-wide" v-text="description">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import TrackWaveform from './TrackWaveform.vue'

  export default {
    components: { TrackWaveform },
    props: {
      timeAgo: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      fileUrl: {
        type: String,
        required: true,
      },
      noBorder: {
        type: Boolean,
        default: false,
      },
      playingPos: {
        type: Number,
        required: false,
      },
      isPlaying: {
        type: Boolean,
        required: false,
      },
      description: {
        type: String,
        required: false,
      }
    },
  }
</script>
