import gql from 'graphql-tag'

export const listSoundFragment = gql`
  fragment ListSoundFields on Sound {
    _id
    name
    isPublic
    ownerType
    coverFile {
      url
    }
    description
    createdAt {
      fromNow
    }
    file {
      url
    }
    creator {
      _id
      type
      username
    }
  }
`

export const listSoundWithPaginationFragment = gql`
  fragment ListSoundWithPagination on PaginatableSoundResult {
    items {
      ...ListSoundFields
    }
    paginationInfo {
      pagesCount
      currentPage
      hasMore
    }
  }

  ${listSoundFragment}
`
