import SimpleSchema from 'simpl-schema'

export const fileSchema = new SimpleSchema({
  secret: {
    type: String,
  },
  url: {
    type: String,
  },
})
