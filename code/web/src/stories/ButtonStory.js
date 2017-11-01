import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const buttonStories = moduleArg => storiesOf('Button', moduleArg)
  .add('with text', () => ({
    template: '<button-component @click="action">Hello Button</button-component>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    template: '<button-component @click="action">😀 😎 👍 💯</button-component>',
    methods: { action: action('clicked') },
  }))
