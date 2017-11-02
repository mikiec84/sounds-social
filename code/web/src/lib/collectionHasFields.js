import { has, every } from 'lodash/fp'

export const collectionHasFields = fieldKeys => every(
  option => every(field => has(field)(option))(fieldKeys)
)

export const collectionHasLabelAndValue = collectionHasFields(['label', 'value'])
export const collectionHasPlaylistFields = collectionHasFields(
  ['id', 'title', 'by', 'byId', 'cover'],
)
