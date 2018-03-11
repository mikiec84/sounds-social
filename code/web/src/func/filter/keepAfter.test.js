import { keepAfter } from './keepAfter'

test('keepAfter', () => {
  const items = [
    { id: 2, label: 'woop' },
    { id: 3, label: 'woop test' },
    { id: 6, label: 'woop test 2' },
    { id: 4, label: 'test 1' },
    { id: 2, label: 'test 0' }
  ]

  const itemsAfter = keepAfter(item => item.id === 4)(items)

  expect(itemsAfter[0].id).toBe(4)
  expect(itemsAfter[1].id).toBe(2)
  expect(itemsAfter[1].label).toBe('test 0')
  expect(keepAfter(item => false)(items)).toEqual([])
})
