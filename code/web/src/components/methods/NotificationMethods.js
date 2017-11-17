export const notificationMethods = {
  openNotification (router, { originalNotification: { referenceType, referenceId } }) {
    if (referenceType === 'sound') {
      router.push({ name: 'sound-detail', params: { id: referenceId } })
    }
  },
  openAuthor (router, { authorId }) {
    router.push({ name: 'profile-detail', params: { id: authorId } })
  },
}
