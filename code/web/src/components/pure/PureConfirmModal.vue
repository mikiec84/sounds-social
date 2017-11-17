<template>
  <div>
    <pure-modal @close="$emit('abort')">
      <div class="pa4">
        <div class="tc">
          <div v-if="icon" class="f2"><pure-icon :icon="icon"></pure-icon></div>
          <div class="mt3">
            <slot></slot>
          </div>
        </div>

        <div class="pt3">
          <div class="dib mr3">
            <pure-button color="dark-red" @click="$emit('confirm')" v-text="$t('Confirm')"></pure-button>
          </div>
          <div class="dib">
            <pure-button @click="$emit('abort')" v-text="$t('Abort')">Abort</pure-button>
          </div>
        </div>
      </div>
    </pure-modal>
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
