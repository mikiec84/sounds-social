import Vue from 'vue'
import { registerComponent } from './registerComponent'

test('registering components helper', () => {
  const component = Vue.extend({
    template: '<button>Hi</div>',
    methods: {
      thisWorks () {
        return 'awesome stuff!'
      },
    },
  })

  registerComponent('my-registered-button', component)

  const vueEl = new Vue(Vue.component('my-registered-button'))

  expect(vueEl.thisWorks()).toBe('awesome stuff!')
})
