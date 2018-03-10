import { get } from 'lodash/fp'
import { fetchGroupsForUser } from './fetchGroupsForUser'

export const fetchGroupIdsForUser = userId => fetchGroupsForUser(userId)({ _id: 1 })
  .fetch()
  .map(get('_id'))
