import { playlistCollection } from '../../PlaylistCollection'

export const deletePlaylist = creatorId => _id =>
  playlistCollection.remove({ _id, creatorId })
