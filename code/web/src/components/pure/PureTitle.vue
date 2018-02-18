<template>
  <h1 :class="[size, 'size source-sans-pro mv3']">
    <slot></slot>
  </h1>
</template>
<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'f-headline-m f-headline-l f1',
      }
    },
  }
</script>
