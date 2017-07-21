const coverStore = new FS.Store.FileSystem('coverPhotos', {
  path: '~/sound-social-cover-photos',
})

const coverPhotosCollection = new FS.Collection('coverPhotos', {
  stores: [coverStore],
})

coverPhotosCollection.allow({
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

export const addCoverFile = file => coverPhotosCollection.insert(file)
export const getFileUrl = _id => {
  const file = coverPhotosCollection.findOne({ _id })

  return file ? file.url() : ''
}
