import { storiesOf } from '@storybook/vue'

export const iconStories = moduleArg => storiesOf('Pure Icon', moduleArg)
  .add('rocket icon', () => ({
    template: `<icon-component icon="rocket"></icon-component>`,
  }))
  .add('trash icon', () => ({
    template: `<icon-component icon="trash"></icon-component>`,
  }))
