import { soundCollection } from '../../SoundCollection'

export const countSoundPlay = _id => soundCollection.update(
  { _id },
  { $inc: { playsCount: 1 } },
)
