import PureTrack from '../src/components/pure/track/Track.vue'

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
}
