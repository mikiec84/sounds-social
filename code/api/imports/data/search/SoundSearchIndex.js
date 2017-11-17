import { Index, MongoDBEngine } from 'meteor/easysearch:core'
import { trackCollection } from '../collection/TrackCollection'

export const soundSearchIndex = new Index({
  collection: trackCollection,
  fields: ['name', 'description'],
  engine: new MongoDBEngine({
    selector: function (...args) {
      const selector = this.defaultConfiguration().selector(...args)

      selector.isPublic = true

      return selector
    }
  }),
})
