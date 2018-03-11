import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Accounts.validateNewUser(user => {
  if (Meteor.users.find().count() > 500) {
    throw new Meteor.Error('reached-limit', 'Reached limit of 500 users')
  }

  if (user.emails.length === 0) {
    throw new Meteor.Error('email-val-fail', 'Email not provided')
  }

  if (user.username && user.username.length < 3) {
    throw new Meteor.Error(
      'username-val-fail',
      'Username must have at least 3 characters and password 6 characters'
    )
  }

  return true
})
