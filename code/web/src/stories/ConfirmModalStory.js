import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import ConfirmModalComponent from '../components/pure/ConfirmModal.vue'

export const confirmModalStories = moduleArg => storiesOf('Confirm Modal', moduleArg)
  .add('with text', () => ({
    components: { ConfirmModalComponent },
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal-component @confirm="confirm" @abort="abort">
  Do you really want to delete this?
</confirm-modal-component>`,
  }))
  .add('with icon', () => ({
    components: { ConfirmModalComponent },
    methods: { confirm: action('confirmed!'), abort: action('aborted!') },
    template: `
<confirm-modal-component @confirm="confirm" @abort="abort" icon="trash-o">
  Do you really want to <span class="b">delete</span> this?
</confirm-modal-component>`,
  }))
