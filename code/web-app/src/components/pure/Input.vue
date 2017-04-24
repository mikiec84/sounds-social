<template>
  <input
      @keyup="keyupMethod($event)"
      :type="type"
      class="input-reset h2 ba b--light-gray ph2 pv3 w-100"
      :placeholder="placeholder" />
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'text',
        required: false,
      },
      placeholder: {
        type: String,
        default: '',
        required: false,
      },
    },
    methods: {
      keyupMethod(e) {
        this.$emit('keyup', e.target.value)
      },
    },
  }
</script>
