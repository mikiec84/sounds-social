<template>
  <div>
    <div :class="[color, 'b f2']" v-text="numberLabel"></div>
    <div :class="[color, 'f5 fw3']" v-if="label" v-text="label"></div>
  </div>
</template>
<script>
  import { getSimpleNumberCount } from '../../../func/getSimpleNumberCount'

  export default {
    props: {
      number: {
        type: Number
      },
      color: {
        type: String,
        default: 'blue',
      },
      label: {
        required: false,
        type: String,
      },
    },
    computed: {
      numberLabel () {
        return getSimpleNumberCount(this.number)
      },
    },
  }
</script>
