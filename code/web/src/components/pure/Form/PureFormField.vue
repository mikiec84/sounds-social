<template>
  <label-input :label="label">
    <div>
      <slot></slot>
      <form-error v-if="error" :error="error" :label="label"></form-error>
    </div>
  </label-input>
</template>
<script>
  export default {
    props: {
      error: {
        type: Object,
      },
      label: {
        type: String,
      },
    }
  }
</script>
