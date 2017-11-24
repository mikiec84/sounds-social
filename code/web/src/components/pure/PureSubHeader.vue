<template>
  <div>
    <div class="bb bw2-ns bw1 b--navy">
      <div v-for="item in items" :key="item.label" class="f3 f2-ns dib ph2 ph3-ns pv2" @click="$emit('click', item)" :class="{ 'b': item.active }">
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
