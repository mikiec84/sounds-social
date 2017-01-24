export const typeDefs = [
  `
  type Track {
    id: String
    name: String
    uploader: User
    tags: [Tag]
    description: String
    comments: [Comment]
    waveformSrc: String
    uploadedAt: String
  }
  `
]

export const resolvers = {
  Track: {},
}
