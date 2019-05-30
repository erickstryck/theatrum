import React, { Component } from 'react'
import { Scene, Actor } from '../../../../src/Teatrum'
export default class CommonPage extends Component {
  /**
   * Renderiza o componente
   */
  render() {
    debugger
    return (
      <div>
        <Scene name="teste2" style={{ color: 'blue' }}>
          <span>test2</span>
          <Actor name="teste4" style={{ color: 'green' }}>
            <span>teste3</span>
          </Actor>
        </Scene>
      </div>
    )
  }
}
