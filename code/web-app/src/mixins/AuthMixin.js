import {
  isAuthenticated,
  logOut,
  showLoginModal,
} from '../api/AuthApi'

export default {
  data() {
    return {
      isAuthenticated: isAuthenticated(),
    }
  },
  methods: {
    authLogIn() {
      showLoginModal()
    },
    authLogOut() {
      logOut()
      window.location.reload()
    },
  },
}
