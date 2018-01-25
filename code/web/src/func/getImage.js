import { getOr } from 'lodash/fp'

export const DEFAULT_IMAGE_URL = 'https://i.imgur.com/ZcN1RNR.png'

export const getImage = getOr(DEFAULT_IMAGE_URL)
