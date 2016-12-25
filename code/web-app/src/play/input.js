import PureInput from '../components/pure/Input.vue'

export default function (play, m) {
  play(PureInput, m)
    .name('pure-input')
    .add('empty input', '<pure-input></pure-input>')
    .add('input with placeholder', '<pure-input placeholder="Search"></pure-input>')
}
