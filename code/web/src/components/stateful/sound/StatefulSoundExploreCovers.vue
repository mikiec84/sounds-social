<template>
  <div>
    <div class="cf mw6 center bg-black-05">
      <div v-for="sound in exploreCovers"
           class="fl w-25 pointer"
           @click="$router.push({ name: 'sound-detail', params: { id: sound._id } })">
        <div class="w-100 cover bg-center" :style="`height: 25vw; max-height: 128px; background-image: url('${coverUrlImage(sound)}')`"></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { exploreCoversQuery } from '../../../api/SoundApi'
  import { getSoundCoverImage } from '../../../func/getImage'

  export default {
    apollo: {
      exploreCovers: {
        query () {
          return exploreCoversQuery
        },
        loadingKey: 'loading',
        fetchPolicy: 'network-only',
      },
    },
    methods: {
      coverUrlImage (sound) {
        return getSoundCoverImage(sound)
      }
    }
  }
</script>
