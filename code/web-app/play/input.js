import PureInput from '../src/components/pure/Input.vue'

export default function (play, m, wrap) {
  play(PureInput, m)
    .name('pure-input')
    .displayName('Input')
    .add('empty input', wrap('<pure-input @keyup="$log(arguments[0])"></pure-input>'))
    .add('input with placeholder', wrap('<pure-input  @keyup="$log(arguments[0])" placeholder="Search"></pure-input>'))
    .add('password input', wrap('<pure-input @keyup="$log(arguments[0])" type="password"></pure-input>'))
}
