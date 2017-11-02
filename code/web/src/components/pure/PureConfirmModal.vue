<template>
  <div>
    <modal-component @close="$emit('abort')">
      <div class="pa4">
        <div class="tc">
          <div v-if="icon" class="f2"><icon-component :icon="icon"></icon-component></div>
          <div class="mt3">
            <slot></slot>
          </div>
        </div>

        <div class="pt3">
          <div class="dib mr3">
            <button-component color="dark-red" @click="$emit('confirm')" v-text="$t('Confirm')"></button-component>
          </div>
          <div class="dib">
            <button-component @click="$emit('abort')" v-text="$t('Abort')">Abort</button-component>
          </div>
        </div>
      </div>
    </modal-component>
  </div>
</template>
<script>
  export default {
    props: {
      icon: {
        type: String,
        required: false,
      },
    }
  }
</script>
