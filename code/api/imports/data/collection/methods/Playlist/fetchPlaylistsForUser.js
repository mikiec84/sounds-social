import { playlistCollection } from '../../PlaylistCollection'

export const fetchPlaylistsForUser = currentUserId => userId => {
  const findPublicSelector = { creatorId: userId }

  if (userId !== currentUserId) findPublicSelector.isPublic = true

  return playlistCollection.find(findPublicSelector, { sort: { createdAt: -1 } }).fetch()
}
