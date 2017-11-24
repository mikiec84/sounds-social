<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <div v-if="Object.keys(formData)" class="f3 mw7">
        <pure-title v-text="$t('Edit playlist')"></pure-title>

        <div class="mt3">
          <label>
            <div class="mb2" v-text="$t('Name')"></div>
            <pure-input
              name="name"
              @keyup="changeFormData('name', arguments[0])"
              :value="formData.name"></pure-input>
          </label>

          <div v-if="$v.formData.name.$error" class="mt3">
            <div v-if="!$v.formData.name.url">
              <pure-error><div v-text="$t('Name cannot be empty')"></div></pure-error>
            </div>
          </div>
        </div>
        <div class="mt3">
          <label>
            <div class="mb2" v-text="$t('Description')"></div>
            <textarea
              class="w-100"
              style="height: 180px"
              name="description"
              @change="formData.description = $event.target.value">{{formData.description}}</textarea>
          </label>
        </div>

        <div class="mt3">
          <label>
            <div class="mb2" v-text="$t('Public')"></div>
            <input type="checkbox"
                   :checked="formData.isPublic"
                   @change="formData.isPublic = $event.target.checked" />
          </label>
        </div>

        <div class="mt3">
          <label>
            <div class="mb3" v-text="$t('Sounds')"></div>

            <div class="dark-gray i mb3 f5" v-text="$t('Drag and drop to reorder')"></div>

            <draggable v-model="formData.sounds"
                       :options="{group:'sounds'}"
                       @start="isDragging=true"
                       @end="isDragging=false">
              <div v-for="sound in formData.sounds"
                   :key="sound._id"
                   class="pointer bg-silver white mb2 pa3">
                <div class="dib v-mid f4 mr3" @click="removeSound(sound._id)">
                  <pure-icon icon="remove"> </pure-icon>
                </div>
                <span class="dib v-mid" v-text="sound.name"></span>
              </div>
            </draggable>
          </label>
        </div>

        <div class="mv4">
          <pure-button
            @click="updatePlaylist"
            :disabled="$v.$error"
            v-text="$t('Update playlist')"
          ></pure-button>
        </div>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script>
  import Draggable from 'vuedraggable'
  import { pick, get } from 'lodash/fp'
  import { required } from 'vuelidate/lib/validators'

  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import { updatePlaylist, playlistEditQuery } from '../../../api/PlaylistApi'

  const pickFields = pick(['playlistId', 'sounds', 'name', 'description', 'isPublic'])

  export default {
    components: {
      HeaderComponent,
      Draggable,
    },
    metaInfo () {
      return {
        title: this.$t('Edit profile'),
      }
    },
    data () {
      return {
        isDragging: false,
        formData: {},
      }
    },
    apollo: {
      playlistEdit: {
        query: playlistEditQuery,
        variables () {
          return { id: this.$route.params.id }
        },
        fetchPolicy: 'network-only',
      },
    },
    watch: {
      playlistEdit () {
        this.formData = pickFields(this.playlistEdit)
        this.formData.sounds = this.formData.sounds.map(pick(['_id', 'name']))
      },
    },
    validations: {
      formData: {
        name: {
          required,
        },
      },
    },
    methods: {
      changeFormData (field, value) {
        this.$v.formData[field].$touch()
        this.formData[field] = value
      },
      removeSound (soundId) {
        this.formData.sounds = this.formData.sounds.filter(
          ({ _id }) => _id !== soundId,
        )
      },
      updatePlaylist () {
        const { formData } = this

        updatePlaylist({
          ...formData,
          soundIds: formData.sounds.map(get('_id')),
        }).then(({ data: { playlist } }) => {
          this.$router.push({
            name: 'playlist-detail',
            params: { id: playlist._id },
          })
        })
      },
    },
  }
</script>
