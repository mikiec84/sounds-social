<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModalClickHandler($event)">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    methods: {
      closeModalClickHandler(event) {
        if (event.target.className.includes('modal-wrapper')) {
          this.$emit('close')
        }
      },
    },
  }
</script>
