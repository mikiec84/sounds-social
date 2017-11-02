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

buttonStories(module)
selectStories(module)
confirmModalStories(module)
confirmModalButtonStories(module)
