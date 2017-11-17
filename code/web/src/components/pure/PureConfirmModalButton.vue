<template>
  <div>
    <pure-button @click="modalOpen = true" :color="buttonColor"><slot name="button"></slot></pure-button>
    <confirm-modal v-if="modalOpen"
                   @confirm="confirm"
                   @abort="modalOpen = false"
                   :icon="modalIcon">
      <slot name="modal"></slot>
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
