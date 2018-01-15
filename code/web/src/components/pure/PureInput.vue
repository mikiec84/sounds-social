<template>
  <input
    @keyup="keyupMethod($event)"
    @keyup.enter="$emit('onEnter', $event.target.value)"
    :type="type"
    :value="value"
    :name="name"
    class="input-reset h2 black ba b--light-gray ph2 source-sans-pro w-100"
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
      name: {
        type: String,
        required: false,
      },
      value: {
        type: String,
        required: false,
      },
      placeholder: {
        type: String,
        default: '',
        required: false,
      },
    },
    methods: {
      keyupMethod (e) {
        this.$emit('keyup', e.target.value)
      },
    },
  }
</script>
