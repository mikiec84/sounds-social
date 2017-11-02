import '../App.vue'
import '../startup/StartupRegisterPureComponents'
import '../startup/StartupI18N'
import '../startup/StartupVueSelect'
import '../startup/StartupAuthMixin'
import '../startup/StartupLodashPlugin'

import { buttonStories } from './ButtonStory'
import { confirmModalStories } from './ConfirmModalStory'
import { confirmModalButtonStories } from './ConfirmModalButtonStory'
import { selectStories } from './SelectStory'
import { soundPlayerStories } from './SoundPlayerStory'
import { iconStories } from './IconStory'

buttonStories(module)
selectStories(module)
iconStories(module)
confirmModalStories(module)
confirmModalButtonStories(module)
soundPlayerStories(module)
