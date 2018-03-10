import { soundCollection } from '../../SoundCollection'
import { playlistCollection } from '../../PlaylistCollection'
import { updateSoundIdsIfPermission } from '../../../../lib/Playlist/updateSoundIdesIfPermission'

export const removeSoundFromPlaylist = soundId => userId => playlistId => {
  soundCollection.check(soundId)

  return updateSoundIdsIfPermission(playlistCollection)(playlistId)(userId)({
    $pull: { soundIds: soundId },
  })
}
