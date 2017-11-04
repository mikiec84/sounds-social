<template>
  <div class="pointer" @click="seekTimeline" ref="timelineEl">
    <div class="w-100 ba b--black" style="height: 10px"></div>
    <div class="relative" style="height: 0; bottom: 10px">
      <div class="bg-navy" :style="`height: 10px; width: ${progress * 100}%; transition: width 0.05s`"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
    methods: {
      seekTimeline (e) {
        this.$emit('seek', e.offsetX / this.$refs.timelineEl.offsetWidth)
      },
    },
  }
</script>
