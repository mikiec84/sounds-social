import { isValidMail } from './isValidMail'

test('isValidMail', () => {
  expect(isValidMail('a.b')).toBe(false)
  expect(isValidMail('atasdf')).toBe(false)
  expect(isValidMail('at@be.com')).toBe(true)
  expect(isValidMail('mat++.de@goo.com')).toBe(true)
})
