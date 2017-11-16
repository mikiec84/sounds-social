<template>
  <div>
    <div class="pointer" v-popover="{ name: dropdownKey }">
      <icon-component :icon="icon"></icon-component>
    </div>

    <popover :name="dropdownKey" :width="220">
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
  }
</script>
