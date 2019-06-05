import React, { Component } from 'react'
import { Scene, Actor, Staff } from '../../../../src/Teatrum'
var interval = 0
export default class CommonPage extends Component {
  /**
   * Renderiza o componente
   */
  render() {
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
