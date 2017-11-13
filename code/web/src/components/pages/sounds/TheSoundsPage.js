export default {
  mounted () {
    const routeToVisit = this.userIsAuthenticated ? 'home' : 'discover'

    this.$router.push({ name: routeToVisit })
  },
  render (createElement) {
    return createElement('div', '')
  },
}
