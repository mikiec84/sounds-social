import { constant } from 'lodash/fp'

import PlaylistDetailPage from '../components/pages/Playlist/ThePlaylistDetailPage.vue'

export const playlistRoutes = [
  {
    name: 'playlist-detail',
    path: '/playlist/:id',
    component: PlaylistDetailPage,
    meta: { needsAuth: constant(false) },
  },
  {
    name: 'playlist-edit',
    path: '/playlist/:id/edit',
    component: {},
    meta: { needsAuth: constant(true) },
  },
]
