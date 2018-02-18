import router from '../routes'

const routeNavigator = {
  openProfile (id, type) {
    router.push({
      name: type === 'group' ? 'group-detail' : 'profile-detail',
      params: { id },
    })
  },
}

export const RouteNavigatorPlugin = {
  install (Vue) {
    Vue.prototype.$routeNavigator = routeNavigator
  },
}
