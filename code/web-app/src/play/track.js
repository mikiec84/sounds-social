import PureTrack from '../components/pure/Track.vue'

export default function (play, m) {
  play(PureTrack, m)
    .name('pure-track')
    .add(
      'default',
      `<pure-track
         label="My track name"
         username="Username"
         @open-profile="$log('open profile')"
         @open-track="$log('open track')"
         waveform-src="http://i.imgur.com/oNy41Cr.png"></pure-track>`
    )
}
