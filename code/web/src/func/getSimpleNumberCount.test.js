import { getSimpleNumberCount } from './getSimpleNumberCount'

test('getSimpleNumberCount', () => {
  expect(getSimpleNumberCount(109)).toBe('109')
  expect(getSimpleNumberCount(45119)).toBe('45K')
  expect(getSimpleNumberCount(8456032)).toBe('8M')
})
