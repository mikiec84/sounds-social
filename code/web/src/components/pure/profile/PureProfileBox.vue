<template>
  <div>
    <div class="tc mt3 mb3">
      <div class="dib">
        <profile-image :source="profileAvatarImage"></profile-image>
      </div>
    </div>

    <div class="pl4">
      <div class="mv3">
        <number-count :number="followerCount" :label="$t('followers')"></number-count>
      </div>

      <div v-if="profile.description" v-text="profile.description" class="mt3 f5 lh-copy"></div>
    </div>

    <div v-if="profile.websiteUrl" class="mt3 pl4">
      <span class="b"><span v-text="$t('Website')"></span>: </span>
      <div class="mt2">
        <a class="link dark-blue" :href="profile.websiteUrl" v-text="profile.websiteUrl"></a>
      </div>
    </div>

    <div class="mv4 tc" v-if="canFollow">
      <pure-button @click="$emit(isFollowedByCurrentUser ? 'unfollow' : 'follow')">
        <div>
          <div v-if="isFollowedByCurrentUser" v-text="$t('Unfollow')"></div>
          <div v-if="!isFollowedByCurrentUser" v-text="$t('Follow')"></div>
        </div>
      </pure-button>
    </div>
  </div>
</template>
<script>
  import { getImage } from '../../../func/getImage'

  export default {
    props: {
      profile: {
        type: Object,
        required: true,
      },
      canFollow: {
        type: Boolean,
        required: false,
      },
      isFollowedByCurrentUser: {
        type: Boolean,
        required: false,
      },
      followerCount: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      profileAvatarImage () {
        return getImage('avatarFile.url')(this.profile)
      }
    }
  }
</script>
