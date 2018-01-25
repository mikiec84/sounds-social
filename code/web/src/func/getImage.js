import { getOr } from 'lodash/fp'

export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/q8hIw2K.png'

export const getImage = getOr(DEFAULT_IMAGE_URL)
