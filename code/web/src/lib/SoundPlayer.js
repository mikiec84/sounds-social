import { isNumber } from 'lodash/fp'
import { Howl } from 'howler'

let soundPlayer
let currentHandle
let isMuted
let hasPaused
let currentSoundData = {}

export const playSound = url => {
  if (soundPlayer) soundPlayer.unload()
  if (currentHandle) clearInterval(currentHandle)

  soundPlayer = new Howl({
    src: [url],
    preload: true,
    html5: true,
  })

  currentSoundData = {}
  hasPaused = false

  if (isMuted) muteSound()

  setTimeout(() => {
    if (!hasPaused) soundPlayer.play()

    currentHandle = setInterval(() => {
      currentSoundData.duration = soundPlayer.duration()
      currentSoundData.seek = soundPlayer.seek()
    }, 50)
  }, 500)
}

export const onPlayerEvent = (emit) => {
  setInterval(() => {
    const { seek, duration } = currentSoundData

    if (seek === 0) {
      emit('done')
      currentSoundData.seek = null
    }

    if (isNumber(seek)) {
      emit('trackPosition', { duration, seek })
    }
  }, 50)
}

export const continueCurrentSound = () => {
  soundPlayer.play()
  hasPaused = false
}

export const pauseCurrentSound = () => {
  soundPlayer.pause()
  hasPaused = true
}

export const muteSound = () => {
  soundPlayer.mute(true)
  isMuted = true
}

export const unmuteSound = () => {
  soundPlayer.mute(false)
  isMuted = false
}

export const seekCurrentSound = seekInSeconds => {
  soundPlayer.seek(seekInSeconds)
}
