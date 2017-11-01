import { collectionHasLabelAndValue } from './collectionHasLabelAndValue'

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
