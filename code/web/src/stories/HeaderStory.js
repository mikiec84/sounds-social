import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

const headerMenuItems = [
  {
    id: 'upload',
    href: { name: 'upload' },
    label: 'Upload',
  },
  {
    id: 'sounds',
    href: { name: 'home' },
    label: 'Sounds',
  },
  {
    id: 'profile',
    href: { name: 'profile-detail', params: { id: 'me' } },
    label: 'Profile',
  },
]

export const headerStories = moduleArg => storiesOf('Pure Header', moduleArg)
  .add('profile active', () => ({
    template: '<pure-header :menuItems="headerMenuItems" activeItemId="profile"></pure-header>',
    data () {
      return {
        headerMenuItems,
      }
    },
  }))
  .add('sounds active', () => ({
    template: '<pure-header :menuItems="headerMenuItems" activeItemId="sounds"></pure-header>',
    data () {
      return {
        headerMenuItems,
      }
    },
  }))
  .add('search term, search active', () => ({
    template: '<pure-header :menuItems="headerMenuItems" searchQuery="house music" @search="search" activeItemId="sounds"></pure-header>',
    data () {
      return {
        headerMenuItems,
      }
    },
    methods: {
      search: action('search'),
    },
  }))
  .add('sounds active, logged in', () => ({
    template: '<pure-header :menuItems="headerMenuItems" :isLoggedIn="true" activeItemId="sounds"></pure-header>',
    data () {
      return {
        headerMenuItems,
      }
    },
  }))
