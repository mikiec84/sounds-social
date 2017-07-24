<template>
  <div class="dib">
    <button-component @click="modalOpen = true"><div v-text="buttonLabel"></div></button-component>
    <modal v-if="modalOpen" @close="modalOpen = false">
      <div class="pa4">
        <upload-zone :label="modalLabel" @upload="$emit('upload', arguments[0])"></upload-zone>
      </div>
    </modal>
  </div>
</template>
<script>
  import $ from 'jquery'

  import ButtonComponent from '../Button.vue'
  import Modal from '../Modal.vue'
  import UploadZone from './UploadZone.vue'

  export default {
    components: {
      ButtonComponent,
      Modal,
      UploadZone,
    },
    props: {
      modalLabel: {
        type: String,
      },
      buttonLabel: {
        type: String,
      },
    },
    data() {
      return {
        modalOpen: false
      }
    },
  }
</script>
