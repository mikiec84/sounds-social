<template>
  <div>
    <div class="tc">
      <pure-button v-if="canCreate" class="mb1 dib" @click="$emit('createGroup')">Create group</pure-button>
    </div>

    <h2 v-if="groups && groups.length" class="mb3 f3" v-text="$t('Part of')"></h2>

    <div class="overflow-y-auto cf custom-max-height-group-list-l">
      <div v-for="group in groups" class="fl w-third-m w-50 w-100-l pr2 pr0-l">
        <div class="pa2 ba bw1 b--light-gray mb2 pointer" @click="$emit('openGroup', group)">
          <div class="dib v-mid cover"
               :style="`width: 50px; height: 50px; background-image: url(${getGroupImage(group)})`"></div>
          <div class="dib v-mid f5 pl2" style="width: calc(100% - 55px)" v-text="group.name"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getImage } from '../../../func/getImage'

  export default {
    props: {
      groups: {
        type: Array,
      },
      canCreate: {
        type: Boolean,
        required: false,
      }
    },
    methods: {
      getGroupImage (group) {
        return getImage('profile.avatarFile.url')(group)
      }
    }
  }
</script>
