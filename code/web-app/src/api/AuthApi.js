import Auth0Lock from 'auth0-lock'

const lock = new Auth0Lock('SGs5RNYMDYxBjJnG5QXr9EvsyxUEIB9T', 'soundssocial.eu.auth0.com')

const TOKEN_KEY = 'soundsocial_0auth_id_token'

export { TOKEN_KEY, lock }

export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY)
export const showLoginModal = () => lock.show()
export const logOut = () => localStorage.removeItem(TOKEN_KEY)

