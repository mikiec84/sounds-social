<template>
  <div class="dib">
    <pure-button @click="modalOpen = true"><div v-text="buttonLabel"></div></pure-button>
    <pure-modal v-if="modalOpen" @close="modalOpen = false">
      <div class="pa4">
        <upload-zone :label="modalLabel" @upload="$emit('upload', arguments[0])"></upload-zone>
      </div>
    </pure-modal>
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
