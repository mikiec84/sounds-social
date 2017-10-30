<template>
  <sub-header @click="$router.push(arguments[0].route)" :items="homeSubHeaderItems"></sub-header>
</template>
<script>
  import SubHeader from '../../pure/SubHeader.vue'

  const isActive = (key, current) => key === current

  export default {
    components: { SubHeader },
    props: {
      current: {
        type: String,
      },
    },
    computed: {
      homeSubHeaderItems () {
        return [
          {
            label: 'Feed',
            route: { name: 'home' },
            active: isActive('feed', this.current),
          },
          {
            label: 'Discover',
            route: { name: 'discover' },
            active: isActive('discover', this.current),
          },
          {
            label: 'Competitions',
            href: '/competitions',
            route: { name: 'discover' },
            active: isActive('competitions', this.current),
          },
        ]
      },
    },
  }
</script>
