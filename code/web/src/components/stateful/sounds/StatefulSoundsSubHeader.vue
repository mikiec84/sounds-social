<template>
  <sub-header-component @click="$router.push(arguments[0].route)" :items="homeSubHeaderItems"></sub-header-component>
</template>
<script>
  const isActive = (key, current) => key === current

  export default {
    props: {
      current: {
        type: String,
      },
    },
    computed: {
      homeSubHeaderItems () {
        return [
          {
            label: this.$t('Feed'),
            route: { name: 'home' },
            active: isActive('feed', this.current),
          },
          {
            label: this.$t('Discover'),
            route: { name: 'discover' },
            active: isActive('discover', this.current),
          },
          {
            label: this.$t('Communities'),
            route: { name: 'discover' },
            active: isActive('competitions', this.current),
          },
        ]
      },
    },
  }
</script>
