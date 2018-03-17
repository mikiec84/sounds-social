export const PlaylistTypeDef = `
type Playlist {
  _id: String!
  name: String!
  description: String
  isPublic: Boolean
  createdAt: Date
  image: File
  creator: User
  sounds: [Sound]
  isEditable: Boolean
  isRemovable: Boolean
}

extend type Query {
  listPlaylist(userId: String): [Playlist]
  getPlaylist(playlistId: String!): Playlist
}

extend type Mutation {
  createPlaylist(name: String! description: String isPublic: Boolean): Playlist
  updatePlaylist(playlistId: String! name: String! description: String isPublic: Boolean soundIds: [String]): Playlist
  removePlaylist(playlistId: String!): Playlist
  addSoundToPlaylist(playlistId: String! soundId: String!): Playlist
}
`
