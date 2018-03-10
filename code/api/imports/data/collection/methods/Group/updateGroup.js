import { groupCollection } from '../../GroupCollection'
import { fileCollection } from '../../FileCollection'
import { omitBy, isNil } from 'lodash/fp'

export const updateGroup = userId => _id => ({ name, type, description, websiteUrl, avatarFile }) => {
  const groupData = {
    name,
    type,
    description,
    websiteUrl,
  }

  if (avatarFile) {
    groupData.avatarFileId = fileCollection.insert({ ...avatarFile })
  }

  return groupCollection.update({ _id, memberIds: userId }, { $set: omitBy(isNil)(groupData) })
}
