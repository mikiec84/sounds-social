<template>
  <div class="mw6">
    <form-field :label="$t('Name')" :error="$v.formData.name">
      <pure-input
        name="name"
        @keyup="changeFormData('name', arguments[0])"
        :value="formData.name"></pure-input>
    </form-field>

    <form-field :label="`${$t('Type')} (${$t('Label, Group, Collective')}...)`" :error="$v.formData.type">
      <pure-input
        name="type"
        @keyup="changeFormData('type', arguments[0])"
        :value="formData.type"></pure-input>
    </form-field>

    <form-field :label="$t('Website Url')" :error="$v.formData.websiteUrl">
      <pure-input
        name="websiteUrl"
        @keyup="changeFormData('websiteUrl', arguments[0])"
        :value="formData.websiteUrl"></pure-input>
    </form-field>

    <form-field :label="$t('Description')" :error="$v.formData.description">
      <textarea
        class="w-100"
        style="height: 180px"
        name="description"
        @change="changeFormData('description', $event.target.value)">{{formData.description}}</textarea>
    </form-field>

    <div class="mt4">
      <upload-zone
        :label="$t(`${groupId ? 'Update' : 'Add'} group avatar`)"
        @upload="uploadAvatarFileImage(arguments[0])"></upload-zone>

      <div v-if="hasUploadedFile" class="mt3 i mid-gray"><span v-text="$t('File uploaded')"></span>!</div>
    </div>

    <div class="mv4">
      <pure-button
        @click="saveGroup"
        :disabled="$v.$invalid"
        :fill="true"
        v-text="$t(groupId ? 'Edit group' : 'Create group')"
      ></pure-button>

      <div class="dib">
        <pure-confirm-modal-button
          @confirm="removeGroup"
          v-if="groupId"
          buttonColor="light-red">
          <div slot="button" v-text="$t('Delete group')"></div>
        </pure-confirm-modal-button>
      </div>
    </div>
  </div>
</template>
<script>
  import { pick } from 'lodash/fp'
  import { url, required, minLength, maxLength } from 'vuelidate/lib/validators'

  import { saveGroup, removeGroup, groupFormDataQuery } from '../../../api/GroupApi'
  import { addGroupAvatarFile } from '../../../api/StorageApi'

  const pickFields = pick(['name', 'type', 'description', 'websiteUrl'])

  export default {
    props: {
      groupId: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        hasUploadedFile: false,
        formData: {
          name: '',
          type: '',
          description: '',
          websiteUrl: '',
        },
      }
    },
    apollo: {
      groupFormData () {
        return {
          query: groupFormDataQuery,
          variables () {
            return { id: this.groupId }
          },
          skip: !this.groupId,
          fetchPolicy: 'network-only',
        }
      },
    },
    watch: {
      groupFormData () {
        if (this.groupId) {
          this.formData = pickFields(this.groupFormData)
        }
      },
    },
    validations: {
      formData: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20),
        },
        websiteUrl: {
          url,
          maxLength: maxLength(50),
        },
        type: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20),
        },
        description: {
          maxLength: maxLength(280),
        },
      },
    },
    methods: {
      changeFormData (field, value) {
        this.$v.formData[field].$touch()
        this.formData[field] = value
      },
      uploadAvatarFileImage (e) {
        const file = e.target.files[0]

        addGroupAvatarFile(file)
          .then(({ _id, secret, url }) => {
            this.formData.avatarFile = { _id, secret, url }
            this.hasUploadedFile = !!_id
          })
          .catch(() => alert(this.$t('Wrong file format')))
      },
      saveGroup () {
        const { name, type, avatarFile, description, websiteUrl } = this.formData

        saveGroup(this.groupId, name, type, websiteUrl, avatarFile, description)
          .then(({ data: { group } }) => this.$router.push({
            name: 'group-detail',
            params: { id: group._id },
          }))
      },
      removeGroup () {
        removeGroup(this.groupId)
          .then(({ data: { group } }) => this.$router.push({
            name: 'profile-detail',
            params: { id: 'me' },
          }))
      }
    },
  }
</script>
