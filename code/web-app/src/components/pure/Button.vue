<template>
  <div class="f6 link dim br1 ph3 pv2 dib dark-blue ba b--dark-blue pointer" href="" @click="onclick($event)">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      onclick(e) {
        e.preventDefault()
        this.$emit('click')
      },
    },
  }
</script>
