import { registerComponent } from './components/registerComponent'
import { ComponentsList } from './components/PureComponentsList'

ComponentsList.forEach(({ id, component }) => registerComponent(id, component))
