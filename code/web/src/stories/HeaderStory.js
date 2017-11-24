import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

const imageUrl = 'https://pre00.deviantart.net/a157/th/pre/i/2016/350/e/5/joji_music__fake_album_cover__by_leavesitw-daru5ty.jpg'
const authorName = 'Hans Peter'
const authorName2 = 'Peter Müller'
const authorId = 1
const authorId2 = 2

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
  .add('with notifications', () => ({
    template: `<pure-header 
:menuItems="headerMenuItems"
:notifications="notifications" 
:isLoggedIn="true"
@openNotification="openNotification" 
@openAuthor="openAuthor" 
activeItemId="sounds"></pure-header>`,
    data () {
      return {
        headerMenuItems,
        notifications: [
          { id: 1, link: '#', content: 'Sound has successfully uploaded', authorId, authorName, imageUrl },
          { id: 2, link: '#', content: 'New comment on "Electro House"', authorId, authorName, imageUrl },
          { id: 3, link: '#', content: 'New comment on "Electro House 2"', authorId: authorId2, authorName: authorName2, imageUrl },
          { id: 4, link: '#', content: 'New comment on "Electro House"', authorId, authorName, imageUrl },
          { id: 5, link: '#', content: 'New comment on "Trap"', authorId: authorId2, authorName: authorName2, imageUrl },
        ],
      }
    },
    methods: {
      openNotification: action('open notification'),
      openAuthor: action('open author'),
    },
  }))
