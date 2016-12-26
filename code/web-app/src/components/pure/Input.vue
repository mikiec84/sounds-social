<template>
  <input @keyup="keyupMethod($event)" type="text" class="input-reset ba b--light-gray pa1" :placeholder="placeholder" />
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
    methods: {
      keyupMethod(e) {
        this.$emit('keyup', e.target.value)
      }
    }
  }
</script>
