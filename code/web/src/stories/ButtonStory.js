import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import ButtonComponent from '../components/pure/Button.vue'

export const buttonStories = moduleArg => storiesOf('Button', moduleArg)
  .add('with text', () => ({
    components: { ButtonComponent },
    template: '<button-component @click="action">Hello Button</button-component>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    components: { ButtonComponent },
    template: '<button-component @click="action">😀 😎 👍 💯</button-component>',
    methods: { action: action('clicked') },
  }))
