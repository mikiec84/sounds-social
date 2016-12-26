<template>
  <div>
    <div class="ph3 ba bw1 b--light-gray br2 mw8">
      <h2 @click="triggerEvent('open-track')" class="lh-copy dib black mv2 dim pointer navy " v-text="label"></h2>
      <div class="description username f5 gray"><span class="black-50">{{timeAgo}}</span> by <span class="dim pointer" @click="triggerEvent('open-profile')">{{username}}</span></div>
      <div class="dim mt3 pointer" @click="triggerEvent('open-track')">
        <img :src="waveformSrc" class="w-100" />
      </div>
    </div>
  </div>
</template>
<script>
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
      waveformSrc: {
        type: String,
        required: true,
      }
    },
    methods: {
      triggerEvent(type) {
        this.$emit(type)
      }
    },
  }
</script>
