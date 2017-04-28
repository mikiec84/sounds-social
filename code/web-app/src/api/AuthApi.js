import { asteroidClient } from './meteor/AsteroidClient'

let isConnected = false

const waitForConnection = new Promise(res => {
  if (isConnected) res()

  asteroidClient.ddp.on('connected', () => {
    isConnected = true
    setTimeout(res, 500) // TODO: why does Meteor.user return null without timeout?
  })
})

const getUser = () => asteroidClient.call('currentUser')

export const getUsername = async () => {
  return 'wow'
}

export const getUserId = async () => {
  await waitForConnection

  const user = await getUser()
  return user._id
}

export const isAuthenticated = async () => {
  await waitForConnection
  return getUser()
}

export const doLogin = (username, password) => asteroidClient.loginWithPassword({
  username,
  password,
})

export const createUser = (username, password) => asteroidClient.call('createUser', {
  username,
  password,
})

export const logOut = () => asteroidClient.logout()

