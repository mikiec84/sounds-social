import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import ConfirmModalButtonComponent from '../components/pure/ConfirmModalButton.vue'

export const confirmModalButtonStories = moduleArg => storiesOf('Confirm Modal Button', moduleArg)
  .add('with text', () => ({
    components: { ConfirmModalButtonComponent },
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal-button-component @confirm="confirm" @abort="abort" modalIcon="trash-o" buttonColor="purple">
  <div slot="button">Remove</div>
  <div slot="modal">Do you really want to delete this?</div>
</confirm-modal-button-component>`,
  }))
