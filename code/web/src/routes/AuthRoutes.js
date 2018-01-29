import { constant } from 'lodash/fp'

import ResetPasswordPage from '../components/pages/Auth/TheAuthResetPasswordPage.vue'

export const authRoutes = [
  {
    name: 'reset-password',
    path: '/reset-password/:token',
    component: ResetPasswordPage,
    meta: { needsAuth: constant(false) },
  },
]
