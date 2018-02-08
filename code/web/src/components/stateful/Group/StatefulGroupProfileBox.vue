
<template>
  <pure-profile-box
    :profile="group"
    :canFollow="group.canFollow"
    :isFollowedByCurrentUser="group.isFollowedByCurrentUser"
    @follow="follow"
    @unfollow="unfollow"
  ></pure-profile-box>
</template>
<script>
  import { follow, unfollow } from '../../../api/GroupApi'

  export default {
    props: {
      group: {
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
