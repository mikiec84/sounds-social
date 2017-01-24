import { Random } from 'meteor/random'
import { sampleSize } from 'lodash'
import { addMockFunctionsToSchema } from 'graphql-tools'

export const mockSchema = (schema) => addMockFunctionsToSchema({
  schema,
  mocks: {
    Track: () => ({
      id: () => Random.id(4),
      waveformSrc: () => 'http://i.imgur.com/oNy41Cr.png',
      name: () => sampleSize(['Track name', 'Darkness in Light', 'Other track'])[0],
    }),
    User: () => ({
      username: () => sampleSize(['franz', 'matteodem', 'hans'])[0],
    }),
    Tag: () => ({
      label: () => sampleSize(['Trap', 'Electro House', 'Awesome sound', 'Free release'])[0]
    })
  },
})
