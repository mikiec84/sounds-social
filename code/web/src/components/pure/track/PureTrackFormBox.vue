<template>
  <div>
    <div v-if="hasFile" class="ba bw1 b--light-gray br2 ph3 mw8">
      <div class="pv3 b gray" v-if="isUploading" v-text="`${$t('Sound uploading')}...`"></div>
      <div class="pv3 b gray i" v-if="!isUploading" v-text="$t('Sound uploaded')"></div>

      <div class="pointer">
        <div class="dib v-mid pr2">
          <i class="fa fa-play" aria-hidden="true"></i>
        </div>
        <input
                type="text"
                :value="name"
                class="h2 f3 b bn lh-copy black mv2 dim navy"
                @change="$emit('changeTitle', $event.target.value)"
                :placeholder="$t('Sound name')" />
      </div>
      <div class="description username f5 gray"><span v-text="$t('by')"></span> <span class="dim pointer" >{{username}}</span></div>

      <textarea
              class="mt4 f5 black-80 lh-copy measure-wide bn w-50"
              type="text"
              @change="$emit('changeDescription', $event.target.value)"
              :placeholder="`${$t('Sound description')}...`">{{description}}</textarea>

      <div class="pv3">
        <button-component :disabled="isUploading" @click="$emit('publish')">{{buttonLabel}}</button-component>
      </div>
    </div>
    <div v-if="!hasFile">
      <upload-zone
              :label="$t('Click here to upload sound')"
              @upload="$emit('uploadFile', arguments[0])"></upload-zone>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      username: {
        type: String,
        required: true,
      },
      hasFile: {
        type: Boolean,
        default: false,
      },
      isUploading: {
        type: Boolean,
        default: true,
      },
      name: {
        type: String,
        required: false,
      },
      description: {
        type: String,
        required: false,
      },
      buttonLabel: {
        type: String,
        default () {
          return this.$t('Publish')
        },
      }
    },
  }
</script>
