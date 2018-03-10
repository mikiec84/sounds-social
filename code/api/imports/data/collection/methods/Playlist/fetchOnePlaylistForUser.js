import { playlistCollection } from '../../PlaylistCollection'
import { fetchOneForCreator } from '../general/fetchOneForCreator'

export const fetchOnePlaylistForUser = fetchOneForCreator(playlistCollection)
