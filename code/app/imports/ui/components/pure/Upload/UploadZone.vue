<template>
  <div>
    <input class="dn" type="file" ref="uploadFile" @change="$emit('upload', $event)" />
    <div class="ba bw1 b--light-gray br2 ph3 mw8 pa3 tc b f3 h5 pointer navy"
         @click="$refs.uploadFile.click()">
      <div style="margin-top: 85px" v-text="label"></div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['label'],
  }
</script>
