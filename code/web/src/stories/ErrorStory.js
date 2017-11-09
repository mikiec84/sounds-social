import { storiesOf } from '@storybook/vue'

export const errorStories = moduleArg => storiesOf('Pure Error', moduleArg)
  .add('with text', () => ({
    template: '<error-component>An Error occurred!</error-component>',
  }))
  .add('with some emoji', () => ({
    template: '<error-component>👎</error-component>',
  }))
