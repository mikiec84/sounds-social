import PureButton from '../src/components/pure/Button.vue'

export default function (play, m, wrap) {
  play(PureButton, m)
    .name('pure-button')
    .displayName('Button')
    .add('with text', wrap(`<pure-button v-on:click="$log('button clicked')">text</pure-button>`))
    .add('with emoji', wrap(`<pure-button v-on:click="$log('button clicked')">💫</pure-button>`))
    .add('with ionicon', wrap(`<pure-button v-on:click="$log('button clicked')"><i class="ion-play"></i></pure-button>`))
    .add('disabled', wrap(`<pure-button :disabled="true" v-on:click="$log('button clicked')">Upload</pure-button>`))
}
