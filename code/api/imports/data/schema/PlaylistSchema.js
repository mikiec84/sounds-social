import SimpleSchema from 'simpl-schema'
import { createdAtAutoValue } from './autoValue/createdAtAutoValue'

export const playlistSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3,
    max: 20,
  },
  description: {
    type: String,
    optional: true,
    max: 280,
  },
  createdAt: {
    type: Date,
    autoValue: createdAtAutoValue,
  },
  creatorId: {
    type: String,
  },
  isPublic: {
    type: Boolean,
  },
  soundIds: {
    type: Array,
    optional: true,
  },
  'soundIds.$': {
    type: String,
  },
})
