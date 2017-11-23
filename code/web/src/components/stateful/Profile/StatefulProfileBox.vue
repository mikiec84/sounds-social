<template>
  <pure-profile-box
    :user="user"
    @follow="follow"
    @unfollow="unfollow"
  ></pure-profile-box>
</template>
<script>
  import { follow, unfollow } from '../../../api/ProfileApi'

  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    methods: {
      follow () {
        follow(this.user._id)
      },
      unfollow () {
        unfollow(this.user._id)
      },
    }
  }
</script>
