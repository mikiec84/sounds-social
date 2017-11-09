import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const soundStories = moduleArg => storiesOf('Pure Sound', moduleArg)
  .add('detail view', () => ({
    methods: { close: action('close!') },
    template: `
<sound-component
  timeAgo="10 minutes ago"
  username="DJ Hans"
  label="Nice track"
  description="Et excepturi magni fugiat temporibus. Placeat nostrum inventore temporibus atque nesciunt nihil qui quasi. "
  :noBorder="true"
  fileUrl="https://www.dropbox.com/s/25xspuhs86x7290/till_the_end_short_snippet.wav?raw=1"
></sound-component>`,
  })).add('list view', () => ({
    methods: { close: action('close!') },
    template: `
<sound-component
  timeAgo="10 minutes ago"
  username="DJ Hans"
  label="Nice track"
  :inListView="true"
  coverFileUrl="https://pre00.deviantart.net/a157/th/pre/i/2016/350/e/5/joji_music__fake_album_cover__by_leavesitw-daru5ty.jpg"
  fileUrl="https://www.dropbox.com/s/25xspuhs86x7290/till_the_end_short_snippet.wav?raw=1"
></sound-component>`,
  }))
