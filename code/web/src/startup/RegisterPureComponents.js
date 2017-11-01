import { registerComponent } from './registerComponent'
import { ComponentsList } from './PureComponentsList'

ComponentsList.forEach(({ id, component }) => registerComponent(id, component))
