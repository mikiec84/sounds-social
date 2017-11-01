import { collectionHasLabelAndValue } from './collectionHasLabelAndValue'
import { flow, map, has, every } from 'lodash/fp'

test('lib collectionHasLabelAndValue', () => {
  expect(collectionHasLabelAndValue([
    { label: 'asdf', value: 'ddd' },
    { label: 'asdf11', value: 'ddd11' },
  ])).toBe(true)

  expect(collectionHasLabelAndValue([
    { label: 'asdf', value: 'ddd' },
    { labela: 'asdf11', value: 'ddd11' },
  ])).toBe(false)
})
