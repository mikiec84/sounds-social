import { Meteor } from 'meteor/meteor'

Meteor.methods({
  currentUser: () => Meteor.user(),
})
