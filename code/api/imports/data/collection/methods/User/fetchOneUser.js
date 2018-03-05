import { Meteor } from 'meteor/meteor'

export const fetchOneUser = _id => Meteor.users.findOne({ _id })
