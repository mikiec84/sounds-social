<template>
  <v-select :value="currentValue" :on-change="onChange" :options="options"></v-select>
</template>
<script>
  import { find } from 'lodash/fp'
  import { collectionHasLabelAndValue } from '../../lib/collectionHasLabelAndValue'

  export default {
    props: {
      options: {
        type: Array,
        validator: collectionHasLabelAndValue,
      },
      current: {
        type: String,
        required: false,
      },
    },
    computed: {
      currentValue () {
        return find(({ value }) => value === this.current)(this.options)
      },
    },
    methods: {
      onChange (val) {
        this.$emit('change', val)
      },
    },
  }
</script>
