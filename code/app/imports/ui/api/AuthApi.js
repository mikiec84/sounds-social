import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { resolvePromiseForCallback } from '../../lib/resolvePromiseForCallback'

export const getUsername = async () => {
  return 'wow'
}

export const getUserId = async () => Meteor.userId()

export const isAuthenticated = async () => !!Meteor.userId()

export const doLogin = (username, password) => new Promise((res, rej) =>
  Meteor.loginWithPassword(username, password, resolvePromiseForCallback(res, rej)))

export const createUser = (username, password) => new Promise((res, rej) => Accounts.createUser({
  username,
  password,
}, resolvePromiseForCallback(res, rej)))

export const logOut = () => new Promise((res, rej) => Meteor.logout(
  resolvePromiseForCallback(res, rej),
))
