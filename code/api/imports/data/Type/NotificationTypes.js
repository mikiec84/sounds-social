export const ADDED = 'added'
export const COMMENT_ADDED = 'comment_added'

export const ALLOWED_NOTIFICATION_TYPES = [
  ADDED,
  COMMENT_ADDED,
]

export const isValidNotificationType = t => ALLOWED_NOTIFICATION_TYPES.includes(t)
