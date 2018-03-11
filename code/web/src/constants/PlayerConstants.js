export const RANDOM_MODE = 'random'
export const LOOP_MODE = 'loop'
export const LOOP_SINGLE_MODE = 'loop-single'

export const isValidMode = mode =>
  mode ? [RANDOM_MODE, LOOP_MODE, LOOP_SINGLE_MODE].includes(mode) : true
