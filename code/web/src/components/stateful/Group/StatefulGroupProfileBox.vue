
<template>
  <pure-profile-box
    :profile="group"
    :canFollow="group.canFollow"
    :followerCount="group.followerCount"
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
        follow(this.group._id)
      },
      unfollow () {
        unfollow(this.group._id)
      },
    }
  }
</script>
