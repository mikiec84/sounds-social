import Button from '../../components/pure/PureButton.vue'
import Select from '../../components/pure/PureSelect.vue'
import Header from '../../components/pure/PureHeader.vue'
import Input from '../../components/pure/PureInput.vue'
import Modal from '../../components/pure/PureModal.vue'
import Icon from '../../components/pure/PureIcon.vue'
import SubHeader from '../../components/pure/PureSubHeader.vue'
import ConfirmModal from '../../components/pure/PureConfirmModal.vue'
import ConfirmModalButton from '../../components/pure/PureConfirmModalButton.vue'
import SingleComment from '../../components/pure/Comment/PureSingleComment.vue'
import Layout from '../../components/pure/layout/PureLayout.vue'
import LayoutWithSidebar from '../../components/pure/layout/PureLayoutWithSidebar.vue'
import ProfileImage from '../../components/pure/profile/PureProfileImage.vue'
import Track from '../../components/pure/sound/PureTrack.vue'
import TrackFormBox from '../../components/pure/sound/PureTrackFormBox.vue'
import TrackList from '../../components/pure/sound/PureTrackList.vue'
import TrackWaveform from '../../components/pure/sound/PureTrackWaveform.vue'
import FileUploadButton from '../../components/pure/Upload/PureFileUploadButton.vue'
import UploadZone from '../../components/pure/Upload/PureUploadZone.vue'
import SoundPlayer from '../../components/pure/sound/PureSoundPlayer.vue'
import SoundPlayerButton from '../../components/pure/sound/PureSoundPlayerButton.vue'
import SoundPlayerList from '../../components/pure/sound/PureSoundPlayerList.vue'
import SoundPlayerTimeline from '../../components/pure/sound/PureSoundPlayerTimeline.vue'

export const ComponentsList = [
  { id: 'button-component', component: Button },
  { id: 'select-component', component: Select },
  { id: 'header-component', component: Header },
  { id: 'input-component', component: Input },
  { id: 'modal-component', component: Modal },
  { id: 'icon-component', component: Icon },
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
  { id: 'sound-player', component: SoundPlayer },
  { id: 'sound-player-button', component: SoundPlayerButton },
  { id: 'sound-player-list', component: SoundPlayerList },
  { id: 'sound-player-timeline', component: SoundPlayerTimeline },
]
