<template>
  <div>
    <div class="f7 i gray">Seeking is disabled temporarily</div>
    <div class="mv3 pointer" id="waveform" ref="waveformDiv"></div>
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
      }
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

      this.$refs.waveformDiv.onclick = () => {
        this.$emit('seekSound', 0)
      }
    },
    destroyed () {
      wavesurfer.stop()
    },
  }
</script>
