<template>
  <header-component :active-item-id="current" @logout="authLogOut"></header-component>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      current: {
        type: String,
        required: true,
      },
    },
  }
</script>
