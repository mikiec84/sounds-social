import { checkMaybe, checkRequired } from './check'

export const checkUserIdMaybe = checkMaybe(String)
export const checkUserIdRequired = checkRequired(String)
