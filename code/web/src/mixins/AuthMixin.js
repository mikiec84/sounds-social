import { logOut, doLogin, createUser } from '../api/AuthApi'

export default {
  methods: {
    authLogIn (username, password) {
      return doLogin(username, password)
    },
    authCreateUser (username, email, password) {
      return createUser(username, email, password)
    },
    authLogOut () {
      this.$router.push({ name: 'home' })
      logOut().then(() => window.location.reload())
    }
  }
}
