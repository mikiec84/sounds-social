import { checkMaybe, checkRequired } from './check'

const userDataStructure = {
  _id: String,
  username: String,
  createdAt: Date,
  followerIds: Array,
  services: Object,
}

export const checkUserIdMaybe = checkMaybe(String)
export const checkUserDataMaybe = checkMaybe(userDataStructure)

export const checkUserIdRequired = checkRequired(String)
