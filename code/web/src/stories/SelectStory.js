import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

const selectOptions = [
  { label: 'Awesome', value: 'aws' },
  { label: 'Nice', value: 'nic' },
  { label: 'Test', value: 'test' },
]

export const selectStories = moduleArg => storiesOf('Select', moduleArg)
  .add('simple options', () => ({
    template: '<div class="mw5"><select-component :options="options" @change="action"></select-component></div>',
    data() {
      return {
        options: selectOptions,
      }
    },
    methods: { action: action('changed') },
  }))
  .add('currently selected', () => ({
    template: '<div class="mw5"><select-component :options="options" :current="current" @change="action"></select-component></div>',
    data() {
      return {
        options: selectOptions,
        current: 'nic'
      }
    },
    methods: { action: action('changed') },
  }))

