import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

export const paginationStories = moduleArg =>
  storiesOf('Pagination', moduleArg)
    .add('with first active', () => ({
      template:
        '<pagination-buttons :pages="5" :currentPage="1" @changePage="click"></pagination-buttons>',
      methods: {
        click: action('change page')
      }
    }))
    .add('with third active', () => ({
      template:
        '<pagination-buttons :pages="6" :currentPage="3" @changePage="click"></pagination-buttons>',
      methods: {
        click: action('change page')
      }
    }))
