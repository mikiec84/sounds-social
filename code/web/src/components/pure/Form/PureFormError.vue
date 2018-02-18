<template>
  <div v-if="error.$error" class="mt3">
    <pure-error v-if="isError(error.url)" v-text="$t('Not a valid URL')"></pure-error>
    <pure-error v-if="isError(error.maxLength)" v-text="$t('{{thing}} must be shorter', { thing })"></pure-error>
    <pure-error v-if="isError(error.required)" v-text="$t('{{thing}} cannot be empty', { thing })"></pure-error>
    <pure-error v-if="isError(error.minLength)" v-text="$t('{{thing}} must be longer', { thing })"></pure-error>
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
    computed: {
      thing () {
        return this.label
      },
    },
    methods: {
      isError (err) {
        return err === false
      },
    },
  }
</script>
