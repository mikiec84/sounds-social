import { Meteor } from 'meteor/meteor'

export const fetchOneUserById = _id => Meteor.users.findOne({ _id })
