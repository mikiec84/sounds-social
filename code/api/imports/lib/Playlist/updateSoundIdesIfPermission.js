import { fetchOnePlaylistForUser } from '../../data/collection/methods/Playlist/fetchOnePlaylistForUser'

export const updateSoundIdsIfPermission = collection => playlistId => userId => updateOperator => {
  const sound = fetchOnePlaylistForUser(userId)(playlistId)

  if (sound) collection.update({ _id: playlistId }, updateOperator)

  return fetchOnePlaylistForUser(userId)(playlistId)
}
