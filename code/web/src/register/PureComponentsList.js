import Button from '../components/pure/PureButton.vue'
import Header from '../components/pure/PureHeader.vue'
import Input from '../components/pure/PureInput.vue'
import Modal from '../components/pure/PureModal.vue'
import SubHeader from '../components/pure/PureSubHeader.vue'
import ConfirmModal from '../components/pure/PureConfirmModal.vue'
import ConfirmModalButton from '../components/pure/PureConfirmModalButton.vue'
import SingleComment from '../components/pure/Comment/PureSingleComment.vue'
import Layout from '../components/pure/layout/PureLayout.vue'
import LayoutWithSidebar from '../components/pure/layout/PureLayoutWithSidebar.vue'
import ProfileImage from '../components/pure/profile/PureProfileImage.vue'
import Track from '../components/pure/track/PureTrack.vue'
import TrackFormBox from '../components/pure/track/PureTrackFormBox.vue'
import TrackList from '../components/pure/track/PureTrackList.vue'
import TrackWaveform from '../components/pure/track/PureTrackWaveform.vue'
import FileUploadButton from '../components/pure/Upload/PureFileUploadButton.vue'
import UploadZone from '../components/pure/Upload/PureUploadZone.vue'

export const ComponentsList = [
  { id: 'button-component', component: Button },
  { id: 'header-component', component: Header },
  { id: 'input-component', component: Input },
  { id: 'modal-component', component: Modal },
  { id: 'sub-header-component', component: SubHeader },
  { id: 'single-comment', component: SingleComment },
  { id: 'layout-default', component: Layout },
  { id: 'layout-with-sidebar', component: LayoutWithSidebar },
  { id: 'profile-image', component: ProfileImage },
  { id: 'track-component', component: Track },
  { id: 'track-form-box', component: TrackFormBox },
  { id: 'track-list', component: TrackList },
  { id: 'track-waveform', component: TrackWaveform },
  { id: 'file-upload-button', component: FileUploadButton },
  { id: 'upload-zone', component: UploadZone },
  { id: 'confirm-modal', component: ConfirmModal },
  { id: 'confirm-modal-button', component: ConfirmModalButton },
]
