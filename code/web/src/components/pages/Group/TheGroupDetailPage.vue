<template>
  <layout-with-sidebar>
    <div slot="header">
      <header-component current="sounds"></header-component>
    </div>
    <div slot="main">
      <div v-if="singleGroup">
        <pure-title v-text="singleGroup.name"></pure-title>
        <h2 class="f3 f2-ns mv3 gray" v-text="singleGroup.type"></h2>
        <sound-list-component
          :query="groupSoundsQuery"
          :defineQueryVariables="defineSoundListQueryVariables"></sound-list-component>
      </div>
      <div v-if="!groupLoading && !singleGroup">
        <div class="i" v-text="$t('Group not found')"></div>
      </div>
    </div>
    <div slot="sidebar">
      <div v-if="singleGroup">
        <stateful-profile-box :group="singleGroup"></stateful-profile-box>

        <div class="mv4 tc" v-if="singleGroup.isEditable">
          <pure-button @click="$router.push({ name: 'group-edit', params: { id: singleGroup._id } })" v-text="$t('Edit group')"></pure-button>
        </div>

        <member-list
          @openMember="$router.push({ name: 'profile-detail', params: { id: arguments[0]._id } })"
          :members="singleGroup.members"></member-list>
      </div>
    </div>
  </layout-with-sidebar>
</template>
<script type="text/ecmascript-6">
  import HeaderComponent from '../../stateful/StatefulHeader.vue'
  import SoundListComponent from '../../stateful/sound/StatefulSoundList.vue'
  import StatefulProfileBox from '../../stateful/Group/StatefulGroupProfileBox.vue'
  import { groupPageQuery as query } from '../../../api/GroupApi'
  import { groupSoundsQuery } from '../../../api/SoundApi'

  export default {
    components: {
      HeaderComponent,
      SoundListComponent,
      StatefulProfileBox,
    },
    data () {
      return {
        singleGroup: null,
        groupLoading: 0,
        groupSoundsQuery,
      }
    },
    apollo: {
      singleGroup: {
        query,
        loadingKey: 'groupLoading',
        fetchPolicy: 'network-only',
        variables () {
          return { id: this.$route.params.id }
        },
      },
    },
    methods: {
      defineSoundListQueryVariables () {
        return {
          groupId: this.$route.params.id,
        }
      },
    },
  }
</script>
