<template>
  <div>
    <div v-if="!displayContent">
      <slot name="loader"></slot>
    </div>
    <transition name="fade">
      <div v-if="displayContent">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  const minLoadingTimeMs = 300

  export default {
    props: {
      isLoading: {
        type: [Boolean, Number],
        required: true,
      },
    },
    data () {
      return {
        delayDisplayingContent: false,
        loadedAtTime: (new Date()).getTime(),
      }
    },
    watch: {
      isLoading () {
        const loaderDifference = Math.abs(this.loadedAtTime - (new Date()).getTime())

        if (!this.isLoading && loaderDifference < minLoadingTimeMs) {
          this.delayDisplayingContent = true

          setTimeout(() => {
            this.delayDisplayingContent = false
          }, minLoadingTimeMs - loaderDifference)
        }
      },
    },
    computed: {
      displayContent () {
        if (this.delayDisplayingContent) return false

        return !this.isLoading
      },
    },
  }
</script>
