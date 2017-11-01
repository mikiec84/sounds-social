<template>
  <div>
    <button-component @click="modalOpen = true" :color="buttonColor"><slot name="button"></slot></button-component>
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
