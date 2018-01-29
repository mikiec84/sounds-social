<template>
  <div class="tc">
    <div class="center dark-blue">
      <div class="pointer" @click="$router.push({ name: 'home' })"><pure-identity-header></pure-identity-header></div>

      <h1 class="f2" v-text="$t('Reset your password')"></h1>
    </div>

    <div class="mt4 mw5 center">
      <div v-show="hasError" class="mb3">
        <pure-error v-text="$t('Passwords do not match or not long enough')"></pure-error>
      </div>
      <pure-input type="password" @onEnter="resetPassword" @keyup="password = arguments[0]" :placeholder="$t('New password')"></pure-input>
      <div class="mt2">
        <pure-input type="password" @onEnter="resetPassword" @keyup="repeatPassword = arguments[0]" :placeholder="$t('Repeat password')"></pure-input>
      </div>

      <div class="mt3">
        <pure-button @click="resetPassword" v-text="$t('Reset')"></pure-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { resetPassword, hasInvalidPassword } from '../../../api/AuthApi'

  export default {
    data () {
      return {
        hasError: '',
        password: '',
        repeatPassword: '',
      }
    },
    methods: {
      resetPassword () {
        if (hasInvalidPassword(this.password) || this.password !== this.repeatPassword) {
          this.hasError = true
          return null
        }

        this.hasError = false

        resetPassword(this.password, this.$route.params.token)
          .then(() => this.$router.push({ name: 'home' }))
          .catch((e) => alert(`Could not reset password (${e.message})`))
      },
    },
  }
</script>
