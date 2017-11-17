import { storiesOf } from '@storybook/vue'

export const errorStories = moduleArg => storiesOf('Pure Error', moduleArg)
  .add('with text', () => ({
    template: '<pure-error>An Error occurred!</pure-error>',
  }))
  .add('with some emoji', () => ({
    template: '<pure-error>👎</pure-error>',
  }))
