<template>
  <div :class="['dib v-mid mr2 mr3-ns', {
      'pointer': !disabled,
      'gray': disabled || inactive,
    }]" @click="!disabled && $emit('click')">
    <pure-icon :icon="icon"></pure-icon>
  </div>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      inactive: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>
