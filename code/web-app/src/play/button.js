import PureButton from '../components/pure/Button.vue'

export default function (play, m) {
  play(PureButton, m)
    .name('pure-button')
    .add('with text', `<pure-button v-on:click="$log('button clicked')">text</pure-button>`)
    .add('with emoji', `<pure-button v-on:click="$log('button clicked')">💫</pure-button>`)
}
