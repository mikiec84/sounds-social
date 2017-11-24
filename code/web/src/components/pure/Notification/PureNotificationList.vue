<template>
  <div class="cf">
    <div :class="[{ 'fl w-33-ns w-100 pa2': grid }]" v-for="item in notifications" :key="item.id">
      <div class="pointer db mv2 pv2 dim" @click="$emit('openNotification', item)">
        <div class="mt3 black f6" v-if="detailed">
          <div class="mb2 f5 i" v-text="`${item.createdAtFromNow}:`"></div>
          <div class="mb1 f6 gray i" v-text="item.createdAtFull"></div>
        </div>
        <div class="cf">
          <div class="fl w-20">
            <div class="contain bg-center w-100" :style="`height: 50px; background-image: url(${item.imageUrl})`"></div>
          </div>
          <div class="fl w-80 pl2">
            <div class="gray pb1 f7" v-text="item.authorName" @click="openAuthor(item, $event)"></div>
            <div class="f6 lh-title black-80" v-text="item.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { collectionHasNotificationFields } from '../../../func/collectionHasFields'

  export default {
    props: {
      notifications: {
        type: Array,
        validator: collectionHasNotificationFields,
      },
      grid: {
        type: Boolean,
        default: false,
        required: false,
      },
      detailed: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    methods: {
      openAuthor (item, e) {
        e.stopPropagation()
        this.$emit('openAuthor', item)
      },
    },
  }
</script>
