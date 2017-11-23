<template>
  <div>
    <layout-with-sidebar>
      <div slot="header">
        <header-component current="sounds"></header-component>
      </div>
      <div slot="main">
        <pure-title v-text="$t('Search')"></pure-title>
        <h2 class="f1 lh-solid mt2 gray" v-text='$t(`Results for "{{query}}"`, { query })'></h2>

        <div v-if="query">
          <sound-list :query="searchSoundQuery" :defineQueryVariables="defineQueryVariables"></sound-list>
        </div>
      </div>
      <div slot="sidebar">
      </div>
    </layout-with-sidebar>
  </div>
</template>
<script>
  import { searchSoundQuery } from '../../api/SoundApi'
  import HeaderComponent from '../stateful/StatefulHeader.vue'
  import SoundList from '../stateful/sound/StatefulSoundList.vue'

  export default {
    components: {
      HeaderComponent,
      SoundList,
    },
    metaInfo () {
      return {
        title: `${this.$t('Search')}: "${this.query}"`,
      }
    },
    data () {
      return {
        searchSoundQuery,
      }
    },
    computed: {
      query () {
        return this.$route.query.q
      },
    },
    methods: {
      defineQueryVariables () {
        return {
          query: this.query,
        }
      },
    },
  }
</script>
