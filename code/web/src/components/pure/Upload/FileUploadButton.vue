<template>
  <div class="dib">
    <button-component @click="modalOpen = true"><div v-text="buttonLabel"></div></button-component>
    <modal-component v-if="modalOpen" @close="modalOpen = false">
      <div class="pa4">
        <upload-zone :label="modalLabel" @upload="$emit('upload', arguments[0])"></upload-zone>
      </div>
    </modal-component>
  </div>
</template>
<script>
  export default {
    props: {
      modalLabel: {
        type: String,
      },
      buttonLabel: {
        type: String,
      },
    },
    data () {
      return {
        modalOpen: false
      }
    },
  }
</script>
