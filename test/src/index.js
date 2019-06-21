import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes'

import { Staff } from '../../src/Teatrum'

render(<Routes />, document.getElementById('content'))

if (module.hot) {
  console.log(Staff.keys())
  module.hot.accept('./Routes', () => {
    const NextApp = require('./Routes').default
    render(<NextApp />, document.getElementById('content'))
  })
}
