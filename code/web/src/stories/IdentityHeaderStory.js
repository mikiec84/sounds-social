import { storiesOf } from '@storybook/vue'

export const identityHeaderStories = moduleArg => storiesOf('Pure Identity Header', moduleArg)
  .add('default', () => ({
    template: '<pure-identity-header></pure-identity-header>',
  }))
