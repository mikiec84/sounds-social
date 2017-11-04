import { getOr } from 'lodash/fp'

export const getImage = getOr('http://tachyons.io/img/logo.jpg')
