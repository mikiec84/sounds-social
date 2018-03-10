import { constant } from 'lodash/fp'

export const sortByNewest = constant({
  sort: { createdAt: -1 },
})
