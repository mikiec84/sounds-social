import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const buttonStories = moduleArg => storiesOf('Pure Button', moduleArg)
  .add('with text', () => ({
    template: '<pure-button @click="action">Hello Button</pure-button>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    template: '<pure-button @click="action">😀 😎 👍 💯</pure-button>',
    methods: { action: action('clicked') },
  }))
