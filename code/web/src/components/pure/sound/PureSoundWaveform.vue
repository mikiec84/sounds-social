<template>
  <div ref="waveformDiv" class="pointer overflow-hidden">
    <div v-if="waveformSize.x"
         ref="progressOverlapGrayDiv"
         class="bg-white absolute z-5 o-60"
         :style="`width: ${waveformSize.x * seekOverZero}px; height: ${waveformSize.y}px`"></div>
    <div class="mv3 z-1"
         style="margin-left: -1px"
         id="waveform"></div>
  </div>
</template>
<script>
  import WaveSurfer from 'wavesurfer.js'

  let wavesurfer

  export default {
    props: {
      fileUrl: {
        type: String,
      },
      isPlaying: {
        type: Boolean,
      },
      seek: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    data () {
      return {
        canvasWidth: 760,
        waveformSize: {},
        seekOverZero: 0,
      }
    },
    watch: {
      seek () {
        if (this.seek > 0) this.seekOverZero = this.seek
      },
    },
    mounted () {
      let recentlyStopped = false
      const context = window.AudioContext ? new AudioContext() : null

      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#1857a9',
        progressColor: '#a0b6e2',
        audioContext: context,
      })

      wavesurfer.setMute(true)
      wavesurfer.load(this.fileUrl)

      wavesurfer.on('seek', () => {
        if (!recentlyStopped) {
          recentlyStopped = true
          wavesurfer.stop()

          setTimeout(() => {
            recentlyStopped = false
          }, 200)
        }
      })

      wavesurfer.on('ready', () => {
        this.waveformSize = {
          x: this.$refs.waveformDiv.clientWidth,
          y: this.$refs.waveformDiv.clientHeight,
        }
      })

      this.$refs.waveformDiv.addEventListener('click', e => {
        const waveformWidth = this.waveformSize.x
        const clickPosition = e.offsetX

        this.$emit('seekSound', clickPosition / waveformWidth)
      })
    },
    destroyed () {
      wavesurfer.stop()
    },
  }
</script>
