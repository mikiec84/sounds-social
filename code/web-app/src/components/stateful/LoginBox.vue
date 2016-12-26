<template>
  <div>
    <div class="dib v-mid w-largeinput">
      <input-component placeholder="Email"></input-component>
    </div>
    <div class="dib v-mid w-largeinput">
      <input-component placeholder="Password" type="password"></input-component>
    </div>

    <div class="dib pl3 v-mid">
      <button-component>Sign In</button-component>
    </div>
  </div>
</template>
<script>
  import InputComponent from '../pure/Input.vue'
  import ButtonComponent from '../pure/Button.vue'

  export default {
    components: { InputComponent, ButtonComponent },
  }
</script>
