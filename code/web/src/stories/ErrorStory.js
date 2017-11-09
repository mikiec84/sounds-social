import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const errorStories = moduleArg => storiesOf('Pure Error', moduleArg)
  .add('with text', () => ({
    template: '<error-component>Hello Button</error-component>',
    methods: { action: action('clicked') },
  }))
  .add('with some emoji', () => ({
    template: '<error-component>👎</error-component>',
    methods: { action: action('clicked') },
  }))
