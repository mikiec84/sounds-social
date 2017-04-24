<template>
  <div v-if="isAuthenticated !== null">
    <div v-if="isAuthenticated">
      <feed-component></feed-component>
    </div>

    <div v-if="!isAuthenticated">
      <div class="bg-dark-blue white">
        <h1 class="f-headline lh-copy tc ma0 pv5">Sound Social</h1>
        <div class="mw8 center">
          <div class="lh-copy f3 ph3 pv4 tc">Join the community of artists and so on! Also get a better description</div>
        </div>
      </div>

      <div class="mt2 center mw5">
        <input-component @keyup="username = arguments[0]" placeholder="Username"></input-component>
        <div class="mt2">
          <input-component @keyup="password = arguments[0]" type="password" placeholder="Password"></input-component>
        </div>
      </div>

      <div class="mw8 center tc">
        <div class="pv4 dib">
          <button-component @click="doLogin(username, password)">Login</button-component>
        </div>

        <div class="pv4 dib">
          <button-component @click="doRegister(username, password)">Register</button-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { isAuthenticated } from '../../api/AuthApi'

  import FeedComponent from './home/FeedPage.vue'
  import ButtonComponent from '../pure/Button.vue'
  import InputComponent from '../pure/Input.vue'

  export default {
    components: { FeedComponent, ButtonComponent, InputComponent },
    data() {
      return {
        username: '',
        password: '',
        isAuthenticated: null,
      }
    },
    mounted() {
      isAuthenticated().then(d => this.isAuthenticated = (!!d && !!d._id))
    },
    methods: {
      doLogin(username, password) {
        this.authLogIn(username, password)
          .then(id => {
            if (id) this.isAuthenticated = true
          })
          .catch(err => alert('Could not log in'))
      },
      doRegister(username, password) {
        this.authCreateUser(username, password)
          .then(data => {
            if (data.id) this.isAuthenticated = true
          })
          .catch(err => alert('Could not create user'))
      },
    },
  }
</script>
