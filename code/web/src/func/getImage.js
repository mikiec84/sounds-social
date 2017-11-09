import { getOr } from 'lodash/fp'

const DEFAULT_IMAGE_URL = 'http://tachyons.io/img/logo.jpg'

export const getImage = getOr(DEFAULT_IMAGE_URL)
