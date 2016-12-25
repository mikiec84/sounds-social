import PureHeader from '../components/pure/Header.vue'

export default function (play, m) {
  play(PureHeader, m)
    .name('pure-header')
    .add('timeline active', `<pure-header active-item-id="timeline"></pure-header>`)
    .add('discover active', `<pure-header active-item-id="discover"></pure-header>`)
}
