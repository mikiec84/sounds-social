<template>
  <div>
    <pure-button @click="modalOpen = true" :color="buttonColor"><slot name="button" v-text="$t('Remove')"></slot></pure-button>
    <confirm-modal v-if="modalOpen"
                   @confirm="confirm"
                   @abort="modalOpen = false"
                   :icon="modalIcon">
      <slot name="modal"><div v-text="$t('Do you really want to delete this?')"></div></slot>
    </confirm-modal>
  </div>
</template>
<script>
  export default {
    props: {
      modalIcon: {
        type: String,
        required: false,
      },
      buttonColor: {
        type: String,
        required: false,
      },
    },
    data () {
      return {
        modalOpen: false,
      }
    },
    methods: {
      confirm () {
        this.modalOpen = false
        this.$emit('confirm')
      },
    },
  }
</script>
