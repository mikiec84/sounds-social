import { playlistCollection } from '../../PlaylistCollection'

export const fetchPublicPlaylistsForUser = currentUserId => userId => {
  const findPublicSelector = { creatorId: userId }

  if (userId !== currentUserId) findPublicSelector.isPublic = true

  return playlistCollection.find(findPublicSelector, { sort: { createdAt: -1 } })
}
