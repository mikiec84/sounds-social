import { resolvePromiseForCallback } from './resolvePromiseForCallback'

describe('resolvePromiseForCallback', function () {
  it('validly resolves', function (done) {
    const resolve = () => {
      done()
    }
    const reject = () => {
      throw new Error('should not be called')
    }

    resolvePromiseForCallback(resolve, reject)(null, true)
  })

  it('validly rejects', function (done) {
    const resolve = () => {
      throw new Error('should not be called')
    }
    const reject = () => {
      done()
    }

    resolvePromiseForCallback(resolve, reject)(new Error('what the heck'))
  })
})
