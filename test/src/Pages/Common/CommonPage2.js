import React, { Component } from 'react'
import { Scene, Actor, Staff } from '../../../../src/Teatrum'
export default class CommonPage2 extends Component {
  /**
   * Renderiza o componente
   */
  render() {
    return (
      <div>
        <Scene name="teste2" style={{ color: 'red' }}>
          <span>test2</span>
          <Actor name="teste4" style={{ color: 'red' }}>
            <span>teste3</span>
          </Actor>
        </Scene>
      </div>
    )
  }
}
