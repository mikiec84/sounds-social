export const SOUND = 'sound'

export const ALLOWED_NOTIFICATION_REFERENCE_TYPES = [
  SOUND,
]

export const isValidNotificationReferenceType = t => ALLOWED_NOTIFICATION_REFERENCE_TYPES.includes(t)
