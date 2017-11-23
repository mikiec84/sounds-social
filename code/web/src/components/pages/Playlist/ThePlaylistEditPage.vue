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
  import { pick } from 'lodash/fp'
  import { required } from 'vuelidate/lib/validators'

  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import { updatePlaylist, playlistEditQuery } from '../../../api/PlaylistApi'

  const pickFields = pick(['playlistId', 'name', 'description', 'isPublic'])

  export default {
    components: {
      HeaderComponent,
    },
    metaInfo () {
      return {
        title: this.$t('Edit profile'),
      }
    },
    data () {
      return {
        formData: {},
      }
    },
    mounted () {
      this.$apollo.query({
        query: playlistEditQuery,
        variables: { id: this.$route.params.id },
      }).then(({ data: { playlistEdit } }) => {
        this.formData = pickFields(playlistEdit)
      })
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
      updatePlaylist () {
        const { formData } = this

        updatePlaylist(formData).then(({ data: { playlist } }) => {
          this.$router.push({
            name: 'playlist-detail',
            params: { id: playlist._id },
          })
        })
      },
    },
  }
</script>
