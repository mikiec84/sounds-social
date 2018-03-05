import { fileCollection } from '../../FileCollection'

export const fetchOneFileById = _id => fileCollection.findOne({ _id })
