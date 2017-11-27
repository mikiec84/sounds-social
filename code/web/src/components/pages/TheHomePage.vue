<template>
  <div v-if="isAuthenticated !== null">
    <div v-if="isAuthenticated">
      <feed-component></feed-component>
    </div>

    <div v-if="!isAuthenticated">
      <div class="bg-dark-blue white hover-bg-white all-transition hover-dark-blue ">
        <div class="center" style="max-width: 500px">
          <pure-identity-header></pure-identity-header>
        </div>
        <div class="mw8 center">
          <div class="lh-copy f4 f3-l ph3 pb4 tc">
            <span v-text="$t('The open and social music platform')"></span>
            <br />
            <div class="f5-l f6 mt1">
              <span v-text="$t('This project is is a work in progress')"></span>. <a class="color-inherit" href="#" v-text="$t('Want to help out?')"></a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt4 center mw5">
        <div v-if="errorType" class="mb3">
          <pure-error><div v-text="$t('Could not {{action}}', { action: errorType })"></div></pure-error>
        </div>

        <pure-input @onEnter="doLogin" @keyup="username = arguments[0]" placeholder="Username"></pure-input>
        <div class="mt2">
          <pure-input @onEnter="doLogin" @keyup="password = arguments[0]" type="password" placeholder="Password"></pure-input>
        </div>
      </div>

      <div class="mw8 center tc">
        <div class="pv4 dib">
          <pure-button @click="doLogin">Login</pure-button>
        </div>

        <div class="pv4 dib">
          <pure-button @click="doRegister">Register</pure-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { isAuthenticated, getUserId } from '../../api/AuthApi'

  import FeedComponent from './sounds/TheFeedPage.vue'

  export default {
    components: { FeedComponent },
    metaInfo () {
      return {
        title: this.$t(this.userIsAuthenticated ? 'Home' : 'Login'),
      }
    },
    data () {
      return {
        username: '',
        password: '',
        errorType: '',
        isAuthenticated: null,
      }
    },
    mounted () {
      isAuthenticated().then(d => {
        this.isAuthenticated = d
      })
    },
    methods: {
      authenticate () {
        this.errorType = ''
        this.isAuthenticated = true
        Vue.prototype.userIsAuthenticated = true
      },
      doLogin () {
        this.authLogIn(this.username, this.password)
          .then(() => {
            getUserId().then(id => {
              if (id) this.authenticate()
            })
          })
          .catch(() => {
            this.errorType = 'login'
          })
      },
      doRegister () {
        this.authCreateUser(this.username, this.password)
          .then(() => this.authenticate())
          .catch(() => {
            this.errorType = 'register'
            alert('Could not create user')
          })
      },
    },
  }
</script>
