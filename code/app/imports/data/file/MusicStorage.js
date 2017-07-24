const musicStore = new FS.Store.FileSystem('musicFiles', {
  path: '~/sound-social-music-files',
})

const musicCollection = new FS.Collection('musicFiles', {
  stores: [musicStore],
})

musicCollection.allow({
  insert: function () {
    return true
  },
  update: function () {
    return true
  },
  remove: function () {
    return true
  },
  download: function () {
    return true
  },
})

export const addMusicFile = file => musicCollection.insert(file)

export const getFileUrl = _id => {
  const file = musicCollection.findOne({ _id })

  return file ? file.url() : ''
}
