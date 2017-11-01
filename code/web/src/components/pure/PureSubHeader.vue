<template>
  <div>
    <div class="bb bw2 b--navy">
      <div v-for="item in items" :key="item.label" class="f2 dib ph3 pv2" @click="$emit('click', item)" :class="{ 'b': item.active }">
        <a class="link navy" :class="{ 'dim': !item.active }" href="" @click.prevent="">{{item.label}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  }
</script>
