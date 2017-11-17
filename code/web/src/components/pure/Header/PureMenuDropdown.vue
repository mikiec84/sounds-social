<template>
  <div>
    <div class="pointer" v-popover="{ name: dropdownKey }">
      <pure-icon :icon="icon"></pure-icon>
    </div>

    <popover ref="popoverEl" :name="dropdownKey" :width="220">
      <div class="black">
        <slot></slot>
      </div>
    </popover>
  </div>
</template>
<script>
  export default {
    props: {
      dropdownKey: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
    methods: {
      closePopover () {
        this.$refs.popoverEl.visible = false
      }
    }
  }
</script>
