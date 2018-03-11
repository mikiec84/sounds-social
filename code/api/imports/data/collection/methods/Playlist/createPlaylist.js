import { playlistCollection } from '../../PlaylistCollection'

export const createPlaylist = ({
  name,
  creatorId,
  isPublic = false,
  description = '',
}) => playlistCollection.insert({ name, creatorId, isPublic, description })
