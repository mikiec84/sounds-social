import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const modalStories = moduleArg => storiesOf('Pure Modal', moduleArg)
  .add('with text', () => ({
    methods: { close: action('close!') },
    template: `
<modal-component @close="close">
  <div class="pa3">Do you really want to delete this?</div>
</modal-component>`,
  }))
  .add('with emoji', () => ({
    methods: { close: action('close!') },
    template: `
<modal-component @close="close">
  <div class="pa3">Do you really want to delete this? ♻</div>
</modal-component>`,
  }))
