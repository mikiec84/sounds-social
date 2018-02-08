import { constant } from 'lodash/fp'

import GroupDetailPage from '../components/pages/Group/TheGroupDetailPage.vue'

export const groupRoutes = [
  {
    name: 'group-detail',
    path: '/group/:id',
    component: GroupDetailPage,
    meta: { needsAuth: constant(false) },
  },
]
