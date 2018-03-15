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
      pagesCount({ totalCount, limit }) {
        return Math.ceil(totalCount / (limit === 0 ? 1 : limit))
      },
      currentPage({ limit, skip }) {
        return 1 // TODO: implement functionality
      },
    },
  },
}
