<template>
  <div>
    <div class="cf" :class="{ 'ba bw1 b--light-gray br2': !noBorder, 'cf pointer': inListView }" style="max-width: 700px" @click="openSound">
      <div class="fl w-50 w-30-m w-25-l pa2" v-if="coverFileUrl" >
        <div class="mw-100 cover bg-center" :style="`max-width: 150px; height: 150px; background: url(${coverFileUrl})`"></div>
      </div>
      <div :class="['fl', { 'w-50 w-70-m w-75-l': coverFileUrl, 'w-100': !coverFileUrl }]">
        <div class="ph3 mw8">
          <div class="pointer f6 f5-ns mt2 mt0-l">
            <div class="dib v-mid pr2" @click="playSound($event)">
              <pure-icon icon="play"></pure-icon>
            </div>
            <h2 class="lh-copy f3-l f4 b di dib-ns v-mid black mv2 dim navy " v-text="label"></h2>
            <div v-if="isPrivate" class="lh-copy dib v-mid b ml0 ml3-ns f4 light-red" v-text="$t('Not published')"></div>
          </div>
          <div class="description username mt2 mt0-ns f5 gray"><span class="black-50">{{timeAgo}}</span> <span v-text="$t('by')"></span> <span class="dim pointer" @click="$emit('open-profile')">{{username}}</span></div>
          <div class="mt3">
            <sound-waveform
                    v-if="!inListView"
                    @seekSound="$emit('seekSound', arguments[0])"
                    :isPlaying="isPlaying"
                    :seek="waveformSeek"
                    :fileUrl="fileUrl"></sound-waveform>
          </div>
          <slot name="metadata"></slot>

          <div v-if="description" class="mt3 mb2 f5 black-80 lh-copy measure-wide" v-text="description">
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
      isPrivate: {
        type: Boolean,
        required: false,
        default: false,
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
    methods: {
      openSound () {
        if (this.inListView) this.$emit('open-sound')
      },
      playSound (e) {
        e.stopPropagation()
        this.$emit('play-sound')
      },
    },
  }
</script>
