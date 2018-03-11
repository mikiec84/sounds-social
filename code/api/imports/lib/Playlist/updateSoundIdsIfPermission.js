import { fetchOnePlaylistForCreator } from '../../data/collection/methods/Playlist/fetchOnePlaylistForCreator'

export const updateSoundIdsIfPermission = collection => playlistId => userId => updateOperator => {
  const sound = fetchOnePlaylistForCreator(userId)(playlistId)

  if (sound) collection.update({ _id: playlistId }, updateOperator)

  return fetchOnePlaylistForCreator(userId)(playlistId)
}
