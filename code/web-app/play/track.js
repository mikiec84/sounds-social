import PureTrack from '../src/components/pure/track/Track.vue'
import PureTrackList from '../src/components/pure/track/TrackList.vue'

export default function (play, m, wrap) {
  play(PureTrack, m)
    .name('pure-track')
    .displayName('Track')
    .add(
      'default',
      wrap(
        `
        <pure-track
          time-ago="20 minutes ago"
          label="My track name"
          username="Username"
          @open-profile="$log('open profile')"
          @open-track="$log('open track')"
          waveform-src="http://i.imgur.com/oNy41Cr.png"></pure-track>`
      )
    )
    .add(
      'detail',
      wrap(
        `
        <pure-track
          time-ago="20 minutes ago"
          label="My track name"
          username="Username"
          @open-profile="$log('open profile')"
          @open-track="$log('open track')"
          :no-border="true"
          description="Aut esse dignissimos at deleniti aut. Labore consequatur quibusdam molestiae quos. Possimus ad est iste maxime deserunt non est. Ipsam qui ex reiciendis vero quisquam quis fugiat et. Quia omnis qui natus.Vel commodi vitae est sunt. Hic rerum dolore adipisci consequatur est dicta. Fugiat perferendis minus aut voluptatem aut rerum praesentium. Quibusdam sapiente eum quos quaerat autem repellat dolor."
          waveform-src="http://i.imgur.com/oNy41Cr.png"></pure-track>`
      )
    )

  play(PureTrackList, m)
    .name('pure-track-list')
    .displayName('Track List')
    .add(
      'default',
      {
        data() {
          return {
            tracks: [
              {
                timeAgo: '20 minutes ago',
                label: 'My track',
                username: 'matteodem',
                waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
              },
              {
                timeAgo: '50 minutes ago',
                label: 'Another track',
                username: 'franz',
                waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
              },
              {
                timeAgo: '2 hours ago',
                label: 'Categorized',
                username: 'Insan3Lik3',
                waveformSrc: 'http://i.imgur.com/oNy41Cr.png',
              },
            ]
          }
        },
        template: wrap(
          `
          <pure-track-list :tracks="tracks"></pure-track-list>
          <style>
            @import 'https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css';
          </style>
          `
        ),
      }
    )
}
