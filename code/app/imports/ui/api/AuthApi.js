import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const resolvePromiseForCallback = (res, rej) => (err, data) => (err ? rej(err) : res(data))

export const getUsername = async () => {
  return 'wow'
}

export const getUserId = async () => Meteor.userId()

export const isAuthenticated = async () => !!Meteor.userId()

export const doLogin = (username, password) => Promise.resolve(
  Meteor.loginWithPassword(username, password),
)

export const createUser = (username, password) => new Promise((res, rej) => Accounts.createUser({
  username,
  password,
}, resolvePromiseForCallback(res, rej)))

export const logOut = () => new Promise((res, rej) => Meteor.logout(
  resolvePromiseForCallback(res, rej),
))
