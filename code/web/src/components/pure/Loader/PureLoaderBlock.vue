<template>
  <div :class="['bg-gray-pulsing-infinite', cssClasses]" :style="cssStyles"></div>
</template>
<script>
  export default {
    props: {
      cssClasses: {
        type: String,
        required: false,
      },
      cssStyles: {
        type: String,
        required: false,
      },
    }
  }
</script>
