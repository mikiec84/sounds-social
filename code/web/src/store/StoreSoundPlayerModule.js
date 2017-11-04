import { find, findKey, filter, clone, defaultTo } from 'lodash/fp'
import shuffleSeed from 'shuffle-seed'
import moment from 'moment'

import {
  playSound,
  continueCurrentSound,
  pauseCurrentSound,
  muteSound,
  unmuteSound,
  seekCurrentSound,
} from '../lib/SoundPlayer'
import { LOOP_SINGLE_MODE, LOOP_MODE, RANDOM_MODE, isValidMode } from '../constants/PlayerConstants'
import { collectionHasPlaylistFields } from '../lib/collectionHasFields'

const findSoundById = soundId => find(sound => sound.id === soundId)
const findSoundKeyById = soundId => findKey(sound => sound.id === soundId)

const changeSoundByKeyIfExists = ({ sounds, dispatch, keyToPlay }) => {
  if (sounds[keyToPlay]) dispatch('changeSoundToPlay', { soundId: sounds[keyToPlay].id })
  else dispatch('pause')
}

const filterOutSoundById = soundIdToFilter => filter(sound => sound.id !== soundIdToFilter)
const isLastSound = soundId => sounds => parseInt(
  findSoundKeyById(soundId)(sounds),
  10) === (sounds.length - 1)

const initSoundPosition = {
  seek: 0,
  duration: 0,
}

const initialState = {
  sounds: [],
  currentId: null,
  mode: null,
  isPlaying: false,
  isMuted: false,
  soundPosition: clone(initSoundPosition),
  randomSeed: 0,
}

export const soundPlayerModule = {
  state: clone(initialState),

  getters: {
    soundPlayingTime: state => moment({
      seconds: state.soundPosition.seek % 60,
      minutes: Math.floor(state.soundPosition.seek / 60),
      hours: Math.floor(state.soundPosition.seek / 60 / 60),
    }).format('HH:mm:ss'),
    soundTimeLineProgress: state => {
      const { seek, duration } = state.soundPosition

      if (seek === 0) return 0

      return seek / defaultTo(1)(duration)
    },
    soundPlayerSounds: state => {
      if (state.mode === RANDOM_MODE) {
        return shuffleSeed.shuffle(state.sounds, state.randomSeed)
      }

      return state.sounds
    }
  },

  actions: {
    resetSound: ({ commit }) => {
      commit('RESET_SOUND')
    },
    addSoundToPlayer: ({ commit, state, dispatch }, { sound }) => {
      if (collectionHasPlaylistFields([sound]) && sound && !findSoundById(sound.id)(state.sounds)) {
        const hasSounds = state.sounds.length > 0
        commit('ADD_SOUND_TO_PLAYER_PLAYLIST', [sound])
        if (!hasSounds) dispatch('playNew')
      }
    },
    changeSoundToPlay: ({ commit, state, dispatch }, { soundId }) => {
      const sound = findSoundById(soundId)(state.sounds)

      if (sound) {
        commit('CHANGE_CURRENT_SOUND_ID', soundId)
        dispatch('playNew')
      }
    },
    changeSoundPosition: ({ commit }, { duration, seek }) => {
      commit('CHANGE_SOUND_POSITION', { duration, seek })
    },
    changeSoundAfterFinished: ({ dispatch, getters, state }) => {
      const { soundPlayerSounds: sounds } = getters
      const { mode, currentId } = state

      if (mode === LOOP_SINGLE_MODE) {
        dispatch('play')
      } else if ([LOOP_MODE, RANDOM_MODE].includes(mode) && isLastSound(currentId)(sounds)) {
        dispatch('changeSoundToPlay', { soundId: sounds[0].id })
      } else {
        dispatch('playerPlayNext')
      }
    },
    removeSound: ({ state, commit }, { soundId }) => {
      const sound = findSoundById(soundId)(state.sounds)

      if (sound && sound.id !== state.currentId) {
        commit('REMOVE_SOUND_FROM_PLAYER_PLAYLIST', soundId)
      }
    },
    playNew: ({ commit, state }) => {
      const sound = findSoundById(state.currentId)(state.sounds)

      playSound(sound.soundUrl)
      commit('PLAY_PLAYER', true)
      commit('RESET_SOUND_POSITION', true)
    },
    play: ({ commit }) => {
      continueCurrentSound()
      commit('PLAY_PLAYER', true)
    },
    pause: ({ commit }) => {
      pauseCurrentSound()
      commit('PLAY_PLAYER', false)
    },
    playerSeekRelativeDecimal: ({ commit, state }, amountInRelativeDecimal) => {
      const newSeek = state.soundPosition.duration * amountInRelativeDecimal
      seekCurrentSound(newSeek)
      commit('CHANGE_SEEK', { seek: newSeek })
    },
    playerStepForward: ({ dispatch }) => dispatch('playerPlayNext'),
    playerPlayNext: ({ state, getters, dispatch }) => {
      const { soundPlayerSounds: sounds } = getters
      const key = parseInt(findSoundKeyById(state.currentId)(sounds), 10)

      changeSoundByKeyIfExists({ sounds, dispatch, keyToPlay: (key + 1) })
    },
    playerStepBackward: ({ dispatch }) => dispatch('playerPlayPrevious'),
    playerPlayPrevious: ({ state, getters, dispatch }) => {
      const { soundPlayerSounds: sounds } = getters
      const key = parseInt(findSoundKeyById(state.currentId)(sounds), 10)

      changeSoundByKeyIfExists({ sounds, dispatch, keyToPlay: (key - 1) })
    },
    mutePlayer: ({ commit }) => {
      muteSound()
      commit('MUTE_PLAYER', true)
    },
    unmutePlayer: ({ commit }) => {
      unmuteSound()
      commit('MUTE_PLAYER', false)
    },
    changePlayerMode: ({ commit }, { mode }) => {
      if (isValidMode(mode)) commit('CHANGE_PLAYER_MODE', mode)
      if (mode === RANDOM_MODE) commit('RANDOMIZE_PLAYLIST')
    },
  },

  mutations: {
    RESET_SOUND (state) {
      Object.keys(initialState).forEach(stateKey => {
        state[stateKey] = clone(initialState[stateKey])
      })
    },
    CHANGE_PLAYER_MODE (state, mode) { state.mode = mode },
    PLAY_PLAYER (state, isPlaying) { state.isPlaying = isPlaying },
    MUTE_PLAYER (state, isMuted) { state.isMuted = isMuted },
    ADD_SOUND_TO_PLAYER_PLAYLIST (state, sounds) {
      if (!state.currentId) state.currentId = sounds[0].id
      state.sounds = state.sounds.concat(sounds)
    },
    CHANGE_CURRENT_SOUND_ID (state, soundId) { state.currentId = soundId },
    REMOVE_SOUND_FROM_PLAYER_PLAYLIST (state, soundId) {
      state.sounds = filterOutSoundById(soundId)(state.sounds)
    },
    RESET_SOUND_POSITION (state) {
      state.soundPosition = clone(initSoundPosition)
    },
    CHANGE_SEEK (state, { seek }) { state.soundPosition.seek = seek },
    CHANGE_SOUND_POSITION (state, { duration, seek }) {
      state.soundPosition.seek = seek
      state.soundPosition.duration = duration
    },
    RANDOMIZE_PLAYLIST (state) {
      state.randomSeed = Math.random()
    },
  },
}
