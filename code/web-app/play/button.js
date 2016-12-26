import PureButton from '../src/components/pure/Button.vue'

export default function (play, m, wrap) {
  play(PureButton, m)
    .name('pure-button')
    .add('with text', wrap(`<pure-button v-on:click="$log('button clicked')">text</pure-button>`))
    .add('with emoji', wrap(`<pure-button v-on:click="$log('button clicked')">💫</pure-button>`))
    .add('with ionicon', wrap(`<pure-button v-on:click="$log('button clicked')"><i class="ion-play"></i></pure-button>`))
}
