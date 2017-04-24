import { createClass } from 'asteroid'

const AsteroidClass = createClass()

// Connect to a Meteor backend
export const asteroidClient = new AsteroidClass({
  endpoint: 'ws://localhost:3000/websocket',
})
