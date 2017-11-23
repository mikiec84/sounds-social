<template>
  <div v-if="!loading">
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <div v-if="soundToEdit">
          <sound-form-box
                  :username="soundToEdit.creator.username"
                  :hasFile="true"
                  :isUploading="false"
                  :name="formData.name || soundToEdit.name"
                  :description="formData.description || soundToEdit.description"
                  :buttonLabel="$t('Save')"
                  @changeTitle="formData.name = arguments[0]"
                  @changeDescription="formData.description = arguments[0]"
                  @publish="saveSound()"
          >
            <div class="dib ml1" slot="additionalButtons">
              <pure-button color="gray"
                           :disabled="isUploading"
                           @click="saveSound(false)"
                           v-if="soundToEdit.isPublic"
                           v-text="`${$t('Save')} (${$t('Private')})`"></pure-button>
            </div>
          </sound-form-box>
        </div>

        <div v-if="!soundToEdit">
          Sound not found!
        </div>
      </div>
      <div slot="sidebar">
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script>
  import { editSoundFormQuery, updateSound } from '../../../api/SoundApi'
  import HeaderComponent from '../../stateful/StatefulHeader.vue'

  export default {
    components: {
      HeaderComponent,
    },
    metaInfo () {
      return {
        title: this.$t('Edit sound'),
      }
    },
    data () {
      return {
        loading: 0,
        formData: {},
      }
    },
    apollo: {
      soundToEdit: {
        query: editSoundFormQuery,
        loadingKey: 'loading',
        variables () {
          return {
            id: this.$route.params.id,
          }
        },
      },
    },
    methods: {
      saveSound (isPublic) {
        updateSound(this.$route.params.id, {
          ...this.$_.pick(this.soundToEdit, ['name', 'description']),
          ...this.formData,
          isPublic,
          creatorId: this.soundToEdit.creator._id,
        }).then(() => {
          this.$router.push({
            name: 'sound-detail',
            params: { id: this.$route.params.id },
          })
        })
      },
    },
  }
</script>
