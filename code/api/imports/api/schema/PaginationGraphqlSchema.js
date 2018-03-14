export default {
  typeDefs: [
    `
    type PaginationInfo {
      hasMore: Boolean!
      # Total count of documents with pagination params ignored
      totalCount: Int!
      # Amount of pages that were found
      pagesCount(countPerPage: Int!): Int!
    }
    
    input PaginationInput {
      limit: Int!
      skip: Int!
    }
    `,
  ],
  resolvers: {},
}
