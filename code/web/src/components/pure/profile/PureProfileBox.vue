<template>
  <div>
    <div class="tc mv4">
      <div class="dib">
        <profile-image :source="profileAvatarImage"></profile-image>
      </div>
    </div>

    <div v-if="user.profile.description" v-text="user.profile.description" class="mt3 pl4 lh-copy"></div>

    <div v-if="user.profile.websiteUrl" class="mt3 pl4">
      <span class="b"><span v-text="$t('Website')"></span>: </span>
      <div class="mt2">
        <a class="link dark-blue" :href="user.profile.websiteUrl" v-text="user.profile.websiteUrl"></a>
      </div>
    </div>

    <div class="mv4 tc" v-if="user.canFollow">
      <pure-button @click="$emit(user.isFollowedByCurrentUser ? 'unfollow' : 'follow')">
        <div>
          <div v-if="user.isFollowedByCurrentUser" v-text="$t('Unfollow')"></div>
          <div v-if="!user.isFollowedByCurrentUser" v-text="$t('Follow')"></div>
        </div>
      </pure-button>
    </div>
  </div>
</template>
<script>
  import { getImage } from '../../../func/getImage'

  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    computed: {
      profileAvatarImage () {
        return getImage('profile.avatarFile.url')(this.user)
      },
    }
  }
</script>
