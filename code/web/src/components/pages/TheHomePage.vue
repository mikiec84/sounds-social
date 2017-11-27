<template>
  <div v-if="isAuthenticated !== null">
    <div v-if="isAuthenticated">
      <feed-component></feed-component>
    </div>

    <div v-if="!isAuthenticated">
      <div class="bg-dark-blue white hover-bg-white all-transition hover-dark-blue ">
        <div class="center" style="max-width: 450px">
          <pure-identity-header></pure-identity-header>
        </div>
        <div class="mw8 center">
          <div class="lh-copy f4 f3-l ph3 pb4  tc">
            <span v-text="$t('The open and social music platform.')"></span>
            <br />
            <div class="f5 mt1">
              <span v-text="$t('This project is is a work in progress.')"></span>
              <a class="color-inherit" href="#" v-text="$t('Want to help out?')"></a>
            </div>
          </div>
        </div>
      </div>

      <div class="mt4 center mw5">
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
    watch: {
      isAuthenticated () {
        // @see https://github.com/ktquez/vue-head#update-elements-with-asynchronous-data-or-after-page-loaded
        setTimeout(() => {
          this.$emit('updateHead')
        }, 200)
      },
    },
    data () {
      return {
        username: '',
        password: '',
        isAuthenticated: null,
      }
    },
    mounted () {
      isAuthenticated().then(d => {
        this.isAuthenticated = d
      })
    },
    methods: {
      doLogin () {
        this.authLogIn(this.username, this.password)
          .then(() => {
            getUserId().then(id => {
              if (id) this.isAuthenticated = true
              Vue.prototype.userIsAuthenticated = true
            })
          })
          .catch(err => {
            console.log(err)
            alert('Could not log in')
          })
      },
      doRegister () {
        this.authCreateUser(this.username, this.password)
          .then(data => {
            this.isAuthenticated = true
          })
          .catch(err => {
            console.log(err)
            alert('Could not create user')
          })
      },
    },
  }
</script>
