<template>
  <div v-if="error.$error" class="mt3">
    <pure-error v-if="error.maxLength === false" v-text="$t('{{thing}} must be shorter', { thing: label })"></pure-error>
    <pure-error v-if="error.url === false" v-text="$t('Not a valid URL')"></pure-error>
  </div>
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
    },
  }
</script>
