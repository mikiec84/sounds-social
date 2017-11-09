<template>
  <div
          :class="[{ 'pointer dim': !disabled, 'o-50 not-allowed': disabled }, color, `b--${color}`]"
          class="user-select-none f6 link br1 ph3 pv2 dib ba" href="" @click="onclick($event)">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'dark-blue',
      },
    },
    methods: {
      onclick (e) {
        e.preventDefault()
        if (!this.disabled) this.$emit('click')
      },
    },
  }
</script>
