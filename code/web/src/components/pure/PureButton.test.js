import { mount } from '@vue/test-utils'
import PureButton from './PureButton.vue'

test('Components - Pure Button - Simple', done => {
  const button = mount(PureButton, {
    slots: {
      default: '<div>Click me!</div>'
    }
  })

  button.setProps({ color: 'red' })

  button.vm.$on('click', () => {
    done()
  })

  expect(button.html()).toContain('Click me!')
  expect(button.html()).toContain('b--red')
  button.trigger('click')
})

test('Components - Pure Button - Disabled', () => {
  const button = mount(PureButton)

  button.setProps({ disabled: true })

  button.vm.$on('click', () => {
    throw new Error('failed')
  })

  button.trigger('click')
})
