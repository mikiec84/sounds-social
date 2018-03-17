export const getCurrentPage = ({ skip = 0, limit }) => {
  if (limit === 0) return -1
  return Math.floor(skip / limit) + 1
}
