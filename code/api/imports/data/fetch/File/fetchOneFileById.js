import { fileCollection } from '../../collection/FileCollection'

export const fetchOneFileById = _id => fileCollection.findOne({ _id })
