import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const confirmModalButtonStories = moduleArg => storiesOf('Confirm Modal Button', moduleArg)
  .add('with text', () => ({
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal-button @confirm="confirm" @abort="abort" modalIcon="trash-o" buttonColor="purple">
  <div slot="button">Remove</div>
  <div slot="modal">Do you really want to delete this?</div>
</confirm-modal-button>`,
  }))
