import { storiesOf } from '@storybook/vue'

export const headerStories = moduleArg => storiesOf('Pure Header', moduleArg)
  .add('profile active', () => ({
    template: '<header-component activeItemId="profile"></header-component>',
  }))
  .add('sounds active', () => ({
    template: '<header-component activeItemId="sounds"></header-component>',
  }))
