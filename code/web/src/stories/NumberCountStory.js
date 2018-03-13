import { storiesOf } from '@storybook/vue'

export const numberCountStories = moduleArg =>
  storiesOf('Pure Number Count', moduleArg)
    .add('small number without label', () => ({
      template: '<number-count :number="123"></number-count>'
    }))
    .add('thousands with label', () => ({
      template:
        '<number-count :number="650501" label="followers"></number-count>'
    }))
    .add('millions with label', () => ({
      template:
        '<number-count :number="7501940" label="awesome people"></number-count>'
    }))
    .add('millions with label and custom color', () => ({
      template:
        '<number-count :number="11501940" color="red" label="awesome people"></number-count>'
    }))
