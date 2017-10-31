import Button from '../components/pure/Button.vue'
import Header from '../components/pure/Header.vue'
import Input from '../components/pure/Input.vue'
import Modal from '../components/pure/Modal.vue'
import SubHeader from '../components/pure/SubHeader.vue'
import SingleComment from '../components/pure/Comment/SingleComment.vue'
import Layout from '../components/pure/Layout/Layout.vue'
import LayoutWithSidebar from '../components/pure/Layout/LayoutWithSidebar.vue'
import ProfileImage from '../components/pure/profile/ProfileImage.vue'
import Track from '../components/pure/track/Track.vue'
import TrackFormBox from '../components/pure/track/TrackFormBox.vue'
import TrackList from '../components/pure/track/TrackList.vue'
import TrackWaveform from '../components/pure/track/TrackWaveform.vue'
import FileUploadButton from '../components/pure/Upload/FileUploadButton.vue'
import UploadZone from '../components/pure/Upload/UploadZone.vue'

export const ComponentsList = [
  { id: 'button-component', component: Button },
  { id: 'header-component', component: Header },
  { id: 'input-component', component: Input },
  { id: 'modal-component', component: Modal },
  { id: 'sub-header-component', component: SubHeader },
  { id: 'single-comment', component: SingleComment },
  { id: 'layout', component: Layout },
  { id: 'layout-with-sidebar', component: LayoutWithSidebar },
  { id: 'profile-image', component: ProfileImage },
  { id: 'track-component', component: Track },
  { id: 'track-form-box', component: TrackFormBox },
  { id: 'track-list', component: TrackList },
  { id: 'track-waveform', component: TrackWaveform },
  { id: 'file-upload-button', component: FileUploadButton },
  { id: 'upload-zone', component: UploadZone },
]
