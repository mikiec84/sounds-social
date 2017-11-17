import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

const selectOptions = [
  { label: 'Awesome', value: 'aws' },
  { label: 'Nice', value: 'nic' },
  { label: 'Test', value: 'test' },
]

export const selectStories = moduleArg => storiesOf('Pure Select', moduleArg)
  .add('simple options', () => ({
    template: '<div class="mw5"><pure-select :options="options" @change="action"></pure-select></div>',
    data () {
      return {
        options: selectOptions,
      }
    },
    methods: { action: action('changed') },
  }))
  .add('pre-selected', () => ({
    template: '<div class="mw5"><pure-select :options="options" :current="current" @change="action"></pure-select></div>',
    data () {
      return {
        options: selectOptions,
        current: 'nic'
      }
    },
    methods: { action: action('changed') },
  }))
