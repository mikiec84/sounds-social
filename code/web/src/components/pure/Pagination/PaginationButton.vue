<template>
  <div class="ba br1 pv2 dib tc pointer f libre-franklin"
       style="width: 35px"
       :class="{ 'black-40 b--black-10': !isActive, 'b bw1 white b--blue bg-blue': isActive }">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      isActive: {
        type: Boolean,
      },
    },
  }
</script>
