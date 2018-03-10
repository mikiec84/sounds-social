import { merge } from 'lodash/fp'

/**
 * Run each function and merge the return value(s) into an object
 *
 * @param funcs
 */
export const flowMerge = (...funcs) => {
  return funcs.reduce((obj, func) => {
    return merge(obj)(func())
  }, {})
}
