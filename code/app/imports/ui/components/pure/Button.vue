<template>
  <div
          :class="{ 'pointer dim': !disabled, 'o-50': disabled }"
          class="f6 link br1 ph3 pv2 dib dark-blue ba b--dark-blue" href="" @click="onclick($event)">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onclick(e) {
        e.preventDefault()
        this.$emit('click')
      },
    },
  }
</script>
