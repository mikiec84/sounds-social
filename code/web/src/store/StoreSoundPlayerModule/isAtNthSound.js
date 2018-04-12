import { constant } from 'lodash/fp'
import { findSoundKeyById } from '../StoreSoundPlayerModule'

const isAtNthSound = getNthIndex => soundId => sounds =>
  parseInt(findSoundKeyById(soundId)(sounds), 10) === getNthIndex(sounds)

export const isFirstSound = isAtNthSound(constant(0))
export const isLastSound = isAtNthSound(sounds => sounds.length - 1)
