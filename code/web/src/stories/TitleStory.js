import { storiesOf } from '@storybook/vue'

export const titleStories = moduleArg => storiesOf('Pure Title', moduleArg)
  .add('with text', () => ({
    template: '<pure-title>Sounds</pure-title>',
  }))
  .add('with emoji', () => ({
    template: '<pure-title>💂 person</pure-title>',
  }))
