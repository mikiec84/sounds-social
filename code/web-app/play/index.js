import { play } from 'vue-play'
import 'tachyons'

import button from './button'
import input from './input'
import header from './header'
import profile from './profile'
import track from './track'
import layout from './layout'

// TODO: add patch-play.css that uses avenir font family
const wrap = (html) => `<div class="ma2">${html}</div>`

button(play, module, wrap)
input(play, module, wrap)
header(play, module, wrap)
profile(play, module, wrap)
track(play, module, wrap)
layout(play, module, wrap)
