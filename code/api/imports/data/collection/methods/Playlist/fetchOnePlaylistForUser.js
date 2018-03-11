import { playlistCollection } from '../../PlaylistCollection'

export const fetchOnePlaylistForUser = currentUserId => playlistId =>
  playlistCollection.findOne({
    $or: [
      { _id: playlistId, isPublic: true },
      { _id: playlistId, creatorId: currentUserId },
    ],
  })
