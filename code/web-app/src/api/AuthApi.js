import { asteroidClient } from './meteor/AsteroidClient'

let isConnected = false

const waitForConnection = new Promise(res => {
  if (isConnected) res()

  asteroidClient.ddp.on('connected', () => {
    res()
  })
})

export const getUsername = async () => {
  return 'wow'
}

export const getUserId = () => 'userId'

export const isAuthenticated = async () => {
  await waitForConnection
  return asteroidClient.call('currentUser')
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

