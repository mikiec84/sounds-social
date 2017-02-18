<template>
  <layout-component>
    <div slot="header">
      <header-component active-item-id="sounds"></header-component>
    </div>
    <div slot="main">
      <track-component
              time-ago="20 minutes ago"
              :label="'Track ' + $route.params.id"
              username="Username"
              @open-profile="$log('open profile')"
              @open-track="$log('open track')"
              :no-border="true"
              description="Aut esse dignissimos at deleniti aut. Labore consequatur quibusdam molestiae quos. Possimus ad est iste maxime deserunt non est. Ipsam qui ex reiciendis vero quisquam quis fugiat et. Quia omnis qui natus.Vel commodi vitae est sunt. Hic rerum dolore adipisci consequatur est dicta. Fugiat perferendis minus aut voluptatem aut rerum praesentium. Quibusdam sapiente eum quos quaerat autem repellat dolor."
              waveform-src="http://i.imgur.com/oNy41Cr.png"></track-component>
    </div>
    <div slot="sidebar">
      Awesome sidebar! (add meta info and so on)
    </div>
  </layout-component>

</template>
<script>
  import TrackComponent from '../../pure/track/Track.vue'
  import HeaderComponent from '../../pure/Header.vue'
  import LayoutComponent from '../../pure/layout/LayoutWithSidebar.vue'

  export default {
    components: {
      TrackComponent,
      LayoutComponent,
      HeaderComponent,
    },
  };
</script>
