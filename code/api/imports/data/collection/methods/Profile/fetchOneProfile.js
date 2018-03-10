import { profileCollection } from '../../ProfileCollection'

export const fetchOneProfile = referenceId => profileCollection.findOne({
  referenceId,
  type: 'user', // FIXME type is not needed
})
