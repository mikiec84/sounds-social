<template>
  <div :class="['dib v-mid mr3', {
      'pointer': !disabled,
      'gray': disabled || inactive,
    }]" @click="!disabled && $emit('click')">
    <icon-component :icon="icon"></icon-component>
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
