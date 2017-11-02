import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

const createSound = (id, title, by) => ({
  id,
  title,
  by,
  byId: `${id}AuthorId`,
  cover: 'https://pre00.deviantart.net/a157/th/pre/i/2016/350/e/5/joji_music__fake_album_cover__by_leavesitw-daru5ty.jpg',
})

const soundList = [
  createSound('XFff1', 'My song', 'David Guetta'),
  createSound('XFff2', 'My second song', 'Babedi Bupedi'),
  createSound('XFff3', 'Third.5 song', 'Matt Music Maker 2'),
  createSound('XFff33', 'Third song', 'Matt Music Maker'),
]

const eventTemplateHandlers = `
@openSound="actionCall('openSound', arguments[0])"
@openProfile="actionCall('openProfile', arguments[0])"
@playSound="actionCall('playSound', arguments[0])"

@play="actionCall('play')"
@pause="actionCall('pause')"
@stepForward="actionCall('stepForward')"
@stepBackward="actionCall('stepBackward')"

@randomize="actionCall('randomize', arguments[0])"
@loop="actionCall('loop', arguments[0])"
@loopSingle="actionCall('loopSingle', arguments[0])"

@mute="actionCall('mute')"
@unmute="actionCall('unmute')"
`

export const soundPlayerStories = moduleArg => storiesOf('Pure Sound Player', moduleArg)
  .add('empty soundlist', () => ({
    template: '<sound-player :sounds="sounds"></sound-player>',
    data () {
      return {
        sounds: [],
      }
    },
  }))
  .add('playing second', () => ({
    template: `<sound-player :isPlaying="true" current="XFff2" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return {
        tracks: soundList,
      }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('paused second', () => ({
    template: `<sound-player :isPlaying="false" current="XFff2" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return {
        tracks: soundList,
      }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('playing first', () => ({
    template: `<sound-player :isPlaying="true" current="XFff1" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('playing last', () => ({
    template: `<sound-player :isPlaying="true" current="XFff33" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('muted playing last', () => ({
    template: `<sound-player :isPlaying="true" :isMuted="true" current="XFff33" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('playing in randomized mode', () => ({
    template: `<sound-player :isPlaying="true" mode="random" current="XFff33" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('playing in loop mode', () => ({
    template: `<sound-player :isPlaying="true" mode="loop" current="XFff33" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
  .add('playing in loop single mode', () => ({
    template: `<sound-player :isPlaying="true" mode="loop-single" current="XFff33" :sounds="tracks" ${eventTemplateHandlers}></sound-player>`,
    data () {
      return { tracks: soundList }
    },
    methods: {
      actionCall(type, args) { action(type)(args) },
    },
  }))
