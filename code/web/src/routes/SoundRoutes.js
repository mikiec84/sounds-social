import { constant } from 'lodash/fp'

import ProfilePage from '../components/pages/TheProfilePage.vue'
import ProfileEditPage from '../components/pages/profile/TheProfileEditPage.vue'

export const soundRoutes = [
  {
    name: 'profile-detail',
    path: '/profile/:id',
    component: ProfilePage,
    meta: { needsAuth: ({ params }) => params.id === 'me' },
  },
  {
    name: 'profile-edit',
    path: '/profile/:id/edit',
    component: ProfileEditPage,
    meta: { needsAuth: constant(true) },
  },
]
