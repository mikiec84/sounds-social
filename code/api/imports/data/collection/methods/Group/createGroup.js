import { groupCollection } from '../../GroupCollection'
import { fileCollection } from '../../FileCollection'

export const createGroup = userId => ({
  name,
  type,
  description,
  websiteUrl,
  avatarFile,
}) => {
  const groupData = {
    creatorId: userId,
    memberIds: [userId],
    name,
    type,
    description,
    websiteUrl,
  }

  if (avatarFile) {
    groupData.avatarFileId = fileCollection.insert({ ...avatarFile })
  }

  return groupCollection.insert(groupData)
}
