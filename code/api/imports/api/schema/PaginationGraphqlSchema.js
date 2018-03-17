import { getPagesCount } from '../../lib/Pagination/getPagesCount'
import { getCurrentPage } from '../../lib/Pagination/getCurrentPage'

export default {
  typeDefs: [
    `
    type PaginationInfo {
      hasMore: Boolean!
      # Total count of documents with pagination params ignored
      totalCount: Int!
      # Amount of pages that were found
      pagesCount: Int!
      currentPage: Int!
    }
    
    input PaginationInput {
      limit: Int!
      skip: Int
    }
    `,
  ],
  resolvers: {
    PaginationInfo: {
      pagesCount: getPagesCount,
      currentPage: getCurrentPage,
    },
  },
}
