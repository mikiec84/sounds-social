import {
  collectionHasFields,
  collectionHasLabelAndValue
} from './collectionHasFields'

test('collectionHasFields', () => {
  expect(
    collectionHasLabelAndValue([
      { label: 'woo', value: 'asdf' },
      { label: 'woo', value2: 'asdf' }
    ])
  ).toBe(false)

  expect(
    collectionHasLabelAndValue([
      { label: 'woo', value: 'asdf' },
      { label: 'woo2', value: 'asdf1' },
      { label: 'woo600', value: 'asdf00' }
    ])
  ).toBe(true)

  expect(
    collectionHasLabelAndValue([
      { label: 'woo', value: 'asdf' },
      { label: 'woo2', value: 'asdf1' },
      { label: 'woo600', value: 'asdf00', additionalField: true }
    ])
  ).toBe(true)

  expect(
    collectionHasFields(['first', 'sec'])([{ first: true, sec: false }])
  ).toBe(true)

  expect(
    collectionHasFields(['first', 'sec'])([{ firsta: true, sec: false }])
  ).toBe(false)
})
