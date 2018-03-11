export const USER = 'user'

export const ALLOWED_USER_TYPES = [USER]

export const isValidUserReferenceType = t => ALLOWED_USER_TYPES.includes(t)
