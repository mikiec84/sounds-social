import PureHeader from '../src/components/pure/Header.vue'
import PureSubHeader from '../src/components/pure/SubHeader.vue'

export default function (play, m) {
  play(PureHeader, m)
    .name('pure-header')
    .add('sounds active', `<pure-header active-item-id="sounds"></pure-header>`)
    .add('profile active', `<pure-header active-item-id="profile"></pure-header>`)

  play(PureSubHeader, m)
    .name('pure-sub-header')
    .add('default', {
      data() {
        return {
          items: [
            {
              label: 'Timeline',
            },
            {
              label: 'Discover',
              active: true,
            }
          ]
        }
      },
      template: `<pure-sub-header :items="items"></pure-sub-header>`
    })
}
