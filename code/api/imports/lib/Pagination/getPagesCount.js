export const getPagesCount = ({ totalCount, limit }) => {
  if (limit === 0) return -1
  return Math.ceil(totalCount / limit)
}
