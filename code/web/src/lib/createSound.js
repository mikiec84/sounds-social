import { getImage } from './getImage'

export const mapGraphlDataToSound = graphqlData => createSound(
  graphqlData._id,
  graphqlData.name,
  graphqlData.creator.username,
  graphqlData.creator._id,
  getImage('getTrack.coverFile.url')(this),
  graphqlData.file.url,
)

export const createSound = (id, title, by, byId, cover, soundUrl) => ({
  id,
  title,
  by,
  byId,
  cover,
  soundUrl,
})
