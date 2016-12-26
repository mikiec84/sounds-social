import PureTrack from '../src/components/pure/track/Track.vue'
import PureTrackList from '../src/components/pure/track/TrackList.vue'

export default function (play, m, wrap) {
  play(PureTrack, m)
    .name('pure-track')
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

  play(PureTrackList, m)
    .name('pure-track-list')
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
          `<pure-track-list :tracks="tracks"></pure-track-list>`
        ),
      }
    )
}
