<template>
  <div>
    <div :class="{ 'ba bw1 b--light-gray br2': !noBorder  }"  class="cf">
      <div class="fl w-25 pa2" v-if="coverFileUrl" >
        <div class="mw-100 cover bg-center" :style="`max-width: 150px; height: 150px; background: url(${coverFileUrl})`"></div>
      </div>
      <div :class="['fl', { 'w-75': coverFileUrl, 'w-100': !coverFileUrl }]">
        <div class="ph3 mw8">
          <div class="pointer">
            <div class="dib v-mid pr2" @click="$emit('play-track')">
              <i class="fa fa-play" aria-hidden="true"></i>
            </div>
            <h2 @click="$emit('open-track')" class="lh-copy f3 b dib v-mid black mv2 dim navy " v-text="label"></h2>
          </div>
          <div class="description username f5 gray"><span class="black-50">{{timeAgo}}</span> <span v-text="$t('by')"></span> <span class="dim pointer" @click="$emit('open-profile')">{{username}}</span></div>
          <div class="mt3 pointer">
            <track-waveform
                    v-if="!inListView"
                    @seekSound="$emit('seekSound', arguments[0])"
                    :isPlaying="isPlaying"
                    :seek="waveformSeek"
                    :fileUrl="fileUrl"></track-waveform>
          </div>

          <div v-if="description" class="mt4 f5 black-80 lh-copy measure-wide" v-text="description">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
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
      },
      inListView: {
        type: Boolean,
        required: false,
      },
      coverFileUrl: {
        type: String,
        required: false,
      },
      waveformSeek: {
        type: Number,
        required: false,
        default: 0,
      },
    },
  }
</script>
