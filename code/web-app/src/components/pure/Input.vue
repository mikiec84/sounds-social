<template>
  <input type="text" class="input-reset ba b--gray pa1" :placeholder="placeholder" />
</template>
<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '',
        required: false,
      },
    },
  }
</script>
