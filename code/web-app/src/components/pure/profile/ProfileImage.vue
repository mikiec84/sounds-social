<template>
    <img
            :src="source"
            class="br4 h4 w4 dib pointer grow-xlarge" alt="avatar">
</template>
<script>
  export default {
    props: {
      source: {
        type: String,
        required: true,
      },
    },
  }
</script>
<style scoped lang="sass">
  @import '../../../styles/functional.scss';
</style>
