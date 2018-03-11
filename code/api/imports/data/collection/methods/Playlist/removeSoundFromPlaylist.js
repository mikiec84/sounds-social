import { playlistCollection } from '../../PlaylistCollection'
import { updateSoundIdsIfPermission } from '../../../../lib/Playlist/updateSoundIdsIfPermission'
import { checkSound } from '../../../../lib/check/checkSound'

export const removeSoundFromPlaylist = soundId => userId => playlistId => {
  checkSound(soundId)

  return updateSoundIdsIfPermission(playlistCollection)(playlistId)(userId)({
    $pull: { soundIds: soundId },
  })
}
