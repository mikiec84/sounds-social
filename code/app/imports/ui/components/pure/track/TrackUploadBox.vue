<template>
  <div>
    <div v-if="hasFile" class="ba bw1 b--light-gray br2 ph3 mw8">
      <div class="pv3 b gray" v-if="isUploading">Track uploading...</div>
      <div class="pv3 b gray i" v-if="!isUploading">Track uploaded</div>

      <div class="pointer">
        <div class="dib v-mid pr2">
          <i class="fa fa-play" aria-hidden="true"></i>
        </div>
        <input
                type="text"
                class="h2 f3 b bn lh-copy black mv2 dim navy"
                @change="$emit('changeTitle', $event.target.value)"
                placeholder="Track name" />
      </div>
      <div class="description username f5 gray"><span class="black-50">just now</span> by <span class="dim pointer" >{{username}}</span></div>
      <div class="mt3 pointer" @click="$emit('open-track')">
        <div v-if="true" class="gray i" style="padding-top: 50px; height: 120px">
          No waveform generated yet.
        </div>
      </div>

      <textarea
              class="mt4 f5 black-80 lh-copy measure-wide bn w-50"
              type="text"
              @change="$emit('changeDescription', $event.target.value)"
              placeholder="Track description..."></textarea>

      <div class="pv3">
        <button-component :disabled="isUploading" @click="$emit('publish')">Publish</button-component>
      </div>
    </div>
    <div v-if="!hasFile">
      <upload-zone
              label="Click to upload track"
              @upload="$emit('uploadFile', arguments[0])"></upload-zone>
    </div>
  </div>
</template>
<script>
  import ButtonComponent from '../../pure/Button.vue'
  import TrackWaveform from '../../pure/track/TrackWaveform.vue'
  import UploadZone from '../Upload/UploadZone.vue'

  export default {
    components: { ButtonComponent, TrackWaveform, UploadZone },
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
    },
    data() {
      return {
        waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
      }
    },
  }
</script>
