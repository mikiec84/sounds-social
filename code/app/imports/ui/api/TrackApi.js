import gql from 'graphql-tag'

export const detailTrackQuery = gql`
  query DetailTrack($id: String!) {
    getTrack(_id: $id) {
      _id
      name
      description
      createdAt
      fileId
      fileUrl
      isRemovable
      coverFile
      creator {
        _id
        username
      }
    }
  }
`

export const editTrackFormQuery = gql`
  query EditTrackForm($id: String!) {
    trackToEdit: getTrack(_id: $id) {
      name
      description
      fileId
      creator {
        _id
        username
      }
    }
  }
`

export const updateTrackMutation = gql`
  mutation EditTrack($id: String! $data: TrackInput!) {
    updateTrack(_id: $id data: $data) {
      _id
    }
  }
`
