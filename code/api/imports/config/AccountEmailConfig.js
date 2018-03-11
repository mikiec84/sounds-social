import { URL } from 'url'
import { Accounts } from 'meteor/accounts-base'
import { webUrl } from './AccessData'

Accounts.emailTemplates.resetPassword = {
  subject() {
    return 'Sounds Social: Reset password'
  },
  text(user, url) {
    const resetUrl = new URL(url)

    Object.keys(webUrl).forEach(webUrlKey => {
      resetUrl[webUrlKey] = webUrl[webUrlKey]
    })

    resetUrl.pathname = resetUrl.hash.replace('#', '')
    resetUrl.hash = ''

    return `Hey ${
      user.username
    }! Change your password by following this link: ${resetUrl.toString()}`
  },
}
