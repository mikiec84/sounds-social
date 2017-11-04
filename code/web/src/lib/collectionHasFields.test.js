import { collectionHasLabelAndValue, collectionHasFields } from './collectionHasFields'

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

test('lib collectionHasFields', () => {
  expect(collectionHasFields(['id', 'by', 'label'])([
    { id: 'wasa', by: 'woww', label: 'asdfasd' },
    { id: 'wasa22', by: 'woww11', label: 'asdfasd' },
    { id: 'wasa23', by: 'woww11', label: 'asdfasd' },
    { id: 'wasa60', by: 'woww11', label: 'asdfasd' },
  ])).toBe(true)

  expect(collectionHasFields(['id', 'by', 'label'])([
    { id: 'wasa', label: 'asdfasd' },
    { id: 'wasa22', by: 'woww11', label: 'asdfasd' },
  ])).toBe(false)
})
