import { getImage } from './getImage'

test('getImage', () => {
  expect(getImage('a.b')({ a: { b: 'myUrl' } })).toBe('myUrl')
  expect(typeof getImage('a.c')({ a: { b: 'myUrl' } })).toBe('string')
})
