<template>
  <div class="mv3 dn" id="waveform" ref="waveformDiv"></div>
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
    },
    data () {
      return {
        canvasWidth: 760,
      }
    },
    mounted () {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#00449e',
        progressColor: '#a0b6e2'
      })

      /* eslint-disable */
      /*wavesurfer.load(this.fileUrl)

      wavesurfer.on('seek', progress => this.$emit('seekSound', progress))

      wavesurfer.setVolume(1)*/
    },
    destroyed () {
      wavesurfer.stop()
    },
    watch: {
      isPlaying () {
        this.isPlaying ? wavesurfer.play() : wavesurfer.pause()
      },
    },
  }
</script>
