<template>
  <div class="mt3">
    <label>
      <div class="mb2" v-text="label"></div>
      <slot></slot>
    </label>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
    },
  }
</script>
