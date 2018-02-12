<template>
  <div class="mw6">
    <!-- TODO: make code more reusable -->
    <label-input :label="$t('Name')">
      <pure-input
        name="name"
        @keyup="changeFormData('name', arguments[0])"
        :value="formData.name"></pure-input>
    </label-input>

    <div v-if="$v.formData.name.$error" class="mt3">
      <pure-error>
        <div v-if="!$v.formData.name.required" v-text="$t('{{thing}} cannot be empty', { thing: $t('Name') })"></div>
        <div v-if="!$v.formData.name.minLength" v-text="$t('{{thing}} must be longer', { thing: $t('Name') })"></div>
        <div v-if="!$v.formData.name.maxLength" v-text="$t('{{thing}} must be shorter', { thing: $t('Name') })"></div>
      </pure-error>
    </div>

    <label-input :label="$t('Type (Label, Group, Collective...)')">
      <pure-input
        name="type"
        @keyup="changeFormData('type', arguments[0])"
        :value="formData.type"></pure-input>
    </label-input>

    <div v-if="$v.formData.type.$error" class="mt3">
      <pure-error>
        <div v-if="!$v.formData.type.required" v-text="$t('{{thing}} cannot be empty', { thing: $t('Type') })"></div>
        <div v-if="!$v.formData.type.minLength" v-text="$t('{{thing}} must be longer', { thing: $t('Type') })"></div>
        <div v-if="!$v.formData.type.maxLength" v-text="$t('{{thing}} must be shorter', { thing: $t('Type') })"></div>
      </pure-error>
    </div>

    <label-input :label="$t('Description')">
      <textarea
        class="w-100"
        style="height: 180px"
        name="description"
        @change="changeFormData('description', $event.target.value)">{{formData.description}}</textarea>
    </label-input>

    <div class="mv4">
      <pure-button
        @click="saveGroup"
        :disabled="$v.$invalid"
        v-text="$t('Create group')"
      ></pure-button>
    </div>
  </div>
</template>
<script>
  import { required, minLength, maxLength } from 'vuelidate/lib/validators'
  import { createGroup } from '../../../api/GroupApi'

  export default {
    props: {
      groupId: {
        type: String,
        required: false,
      },
    },
    data () {
      return {
        formData: {
          name: '',
          type: '',
          description: '',
        },
      }
    },
    validations: {
      formData: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(20),
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
      saveGroup () {
        const { name, type, description } = this.formData

        createGroup(name, type, description)
          .then(({ data: { group } }) => this.$router.push({
            name: 'group-detail',
            params: { id: group._id },
          }))
      },
    },
  }
</script>
