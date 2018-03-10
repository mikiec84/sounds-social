import { soundCollection } from '../../SoundCollection'
import { playlistCollection } from '../../PlaylistCollection'
import { updateSoundIdsIfPermission } from '../../../../lib/Playlist/updateSoundIdesIfPermission'
import { removeSoundFromPlaylist } from './removeSoundFromPlaylist'

export const addSoundToPlaylist = soundId => userId => playlistId => {
  soundCollection.check(soundId)

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
