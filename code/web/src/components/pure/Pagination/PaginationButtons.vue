<template>
  <div>
    <div v-for="page in pages"
         :key="page"
         @click="$emit('changePage', page)"
         :class="['dib', { 'mr3': (page > 0 && pages > page) }]">
      <pagination-button :isActive="page === currentPage" v-text="page"></pagination-button>
    </div>
  </div>
</template>
<script>
  import PaginationButton from './PaginationButton.vue'

  export default {
    props: {
      pages: {
        type: Number,
      },
      currentPage: {
        type: Number,
      },
    },
    components: { PaginationButton },
  }
</script>
