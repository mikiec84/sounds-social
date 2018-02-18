<template>
  <pure-profile-box
    :profile="user.profile"
    :canFollow="user.canFollow"
    :isFollowedByCurrentUser="user.isFollowedByCurrentUser"
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
