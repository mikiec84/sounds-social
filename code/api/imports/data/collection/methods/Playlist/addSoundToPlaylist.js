import { playlistCollection } from '../../PlaylistCollection'
import { updateSoundIdsIfPermission } from '../../../../lib/Playlist/updateSoundIdsIfPermission'
import { removeSoundFromPlaylist } from './removeSoundFromPlaylist'
import { checkSound } from '../../../../lib/check/checkSound'

export const addSoundToPlaylist = soundId => userId => playlistId => {
  checkSound(soundId)

  removeSoundFromPlaylist(soundId)(userId)(playlistId)

  return updateSoundIdsIfPermission(playlistCollection)(playlistId)(userId)({
    $push: {
      soundIds: {
        $each: [soundId],
        $position: 0,
      },
    },
  })
}
