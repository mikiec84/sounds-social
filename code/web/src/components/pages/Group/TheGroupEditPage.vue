<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <div class="f3 mw7">
        <pure-title v-text="$t('Edit group')"></pure-title>

        <stateful-group-form :groupId="$route.params.id"></stateful-group-form>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script>
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import StatefulGroupForm from '../../stateful/Group/StatefulGroupForm.vue'

  export default {
    components: {
      HeaderComponent,
      StatefulGroupForm,
    },
    metaInfo () {
      return {
        title: this.$t('Edit group'),
      }
    },
  }
</script>
