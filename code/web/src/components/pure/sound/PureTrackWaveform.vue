<template>
  <div class="mv3" id="waveform" ref="waveformDiv"></div>
</template>
<script>
  import WaveSurfer from 'wavesurfer.js'

  let wavesurfer

  const getSeekDifference = ({ seek }) => {
    return Math.abs(seek - (wavesurfer.getCurrentTime() / wavesurfer.getDuration()))
  }

  const isSeekDifferenceTooBig = ({ seek }) => getSeekDifference({ seek }) > 0.05

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
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#00449e',
        progressColor: '#a0b6e2',
        audioContext: null,
      })

      wavesurfer.setMute(true)
      wavesurfer.load(this.fileUrl)

      wavesurfer.on('seek', progress => {
        if (progress > 0) this.$emit('seekSound', progress)
      })
    },
    destroyed () {
      wavesurfer.stop()
    },
    watch: {
      seek () {
        if (isSeekDifferenceTooBig(this)) {
          setTimeout(() => {
            if (isSeekDifferenceTooBig(this)) wavesurfer.seekTo(this.seek)
          }, 100)
        }

        this.isPlaying ? wavesurfer.play() : wavesurfer.pause()
      },
    },
  }
</script>
