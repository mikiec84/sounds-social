import { findIndex, isEqual } from 'lodash/fp'
import { Mongo } from 'meteor/mongo'
import { playlistSchema } from '../schema/PlaylistSchema'

export const playlistCollection = new Mongo.Collection('playlists')

playlistCollection.attachSchema(playlistSchema)
