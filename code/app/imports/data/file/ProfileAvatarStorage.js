const profileAvatarStore = new FS.Store.FileSystem('profileAvatarFiles', {
  path: '~/sound-social-profileAvatar-files',
})

const avatarStorage = new FS.Collection('profileAvatarFiles', {
  stores: [profileAvatarStore],
})

avatarStorage.allow({
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

export const addProfileAvatarFile = file => avatarStorage.insert(file)

export const getFileUrl = _id => {
  const file = avatarStorage.findOne({ _id })

  return file ? file.url() : ''
}
