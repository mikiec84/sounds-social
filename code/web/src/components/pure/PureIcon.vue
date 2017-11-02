<template>
  <i :class="`fa fa-${icon}`"></i>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true,
      },
    },
  }
</script>
