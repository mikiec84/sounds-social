<template>
  <div class="mv3">
    <canvas height="120" :width="canvasWidth" ref="canvas"></canvas>
  </div>
</template>
<script>
  import WaveForm from 'waveform-data'

  export default {
    props: ['fileUrl'],
    data() {
      return {
        canvasWidth: 760,
      }
    },
    mounted() {
      const canvas = this.$refs.canvas

      canvas.onclick = (e) => this.$emit('seekSound', (e.layerX / this.canvasWidth))

      fetch(this.fileUrl)
        .then(res => res.arrayBuffer())
        .then(buffer => {
          const waveform = WaveForm.create(buffer)
          const amplitude = 256
          const ctx = canvas.getContext('2d')

          const interpolateHeight = (totalHeight) => {
            return (size) => totalHeight - ((size + (amplitude / 2)) * totalHeight) / amplitude
          }

          const y = interpolateHeight(canvas.height)

          ctx.lineWidth= '1'
          ctx.strokeStyle= '#00449e'

          ctx.beginPath()

          waveform.min
            .forEach((val, x) => ctx.lineTo(x, y(val) + 0.5))

          waveform.max
            .reverse()
            .forEach((val, x) => {
              ctx.lineTo((waveform.offset_length - x), y(val))
            })

          ctx.closePath()
          ctx.stroke()
        })
    },
  }
</script>
