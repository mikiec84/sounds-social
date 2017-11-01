import { has, every } from 'lodash/fp'

export const collectionHasLabelAndValue = every(
  option => has('label')(option) && has('value')(option),
)
