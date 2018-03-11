import { playlistCollection } from '../../PlaylistCollection'
import { fetchOneForCreator } from '../general/fetchOneForCreator'

export const fetchOnePlaylistForCreator = fetchOneForCreator(playlistCollection)
