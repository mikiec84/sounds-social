import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const confirmModalButtonStories = moduleArg => storiesOf('Pure Confirm Modal Button', moduleArg)
  .add('with text', () => ({
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<pure-confirm-modal-button @confirm="confirm" @abort="abort" modalIcon="rocket" buttonColor="purple">
  <div slot="button">Remove</div>
  <div slot="modal">Do you really want to delete this?</div>
</pure-confirm-modal-button>`,
  }))
