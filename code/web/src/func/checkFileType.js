const throwTypeError = () => {
  throw new Error('Invalid file provided')
}

const checkTypePrefix = prefix => file => {
  if (file.type.indexOf(prefix) === -1) throwTypeError()
}

export const checkImageFileType = checkTypePrefix('image/')

export const checkAudioFileType = checkTypePrefix('audio/')
