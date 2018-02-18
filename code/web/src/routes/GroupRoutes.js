import { constant } from 'lodash/fp'

import GroupDetailPage from '../components/pages/Group/TheGroupDetailPage.vue'
import GroupEditPage from '../components/pages/Group/TheGroupEditPage.vue'

export const groupRoutes = [
  {
    name: 'group-detail',
    path: '/group/:id',
    component: GroupDetailPage,
    meta: { needsAuth: constant(false) },
  },
  {
    name: 'group-edit',
    path: '/group/:id/edit',
    component: GroupEditPage,
    meta: { needsAuth: constant(true) },
  },
]
