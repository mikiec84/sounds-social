import { getImage } from '../getImage'

export const mapGraphlDataToSound = graphqlData => createSound(
  graphqlData._id,
  graphqlData.name,
  graphqlData.creator.username,
  graphqlData.creator._id,
  graphqlData.creator.type,
  getImage('coverFile.url')(graphqlData),
  graphqlData.file.url,
)

export const createSound = (id, title, by, byId, byType, cover, soundUrl) => ({
  id,
  title,
  by,
  byId,
  byType,
  cover,
  soundUrl,
})
