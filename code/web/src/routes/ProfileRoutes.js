import { constant } from 'lodash/fp'

import SoundDetailPage from '../components/pages/sound/TheSoundDetailPage.vue'
import SoundEditPage from '../components/pages/sound/TheSoundEditPage.vue'
import SoundsPage from '../components/pages/sounds/TheSoundsPage'

export const profileRoutes = [
  {
    name: 'sound-detail',
    path: '/sounds/:id',
    component: SoundDetailPage,
    meta: { needsAuth: constant(false) },
  },
  {
    name: 'sound-edit',
    path: '/sounds/:id/edit',
    component: SoundEditPage,
    meta: { needsAuth: constant(false) },
  },
  {
    name: 'sounds',
    path: '/sounds',
    component: SoundsPage,
    meta: { needsAuth: constant(false) },
  },
]
