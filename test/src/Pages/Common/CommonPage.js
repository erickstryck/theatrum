import React, { Component } from 'react'
import { Stage, Scene, Actor, Staff } from '../../../../src/Staff'
export default class CommonPage extends Component {
  componentDidMount() {
    debugger
    setTimeout(() => {
      Staff.setAttribute('teste4', { color: 'yellow' })
    }, 3000)
  }

  /**
   * Renderiza o componente
   */
  render() {
    debugger
    return (
      <div>
        <span>hello</span>
        <Stage name="teste" style={{ color: 'red' }}>
          <span>teste</span>
          <Scene name="teste2" style={{ color: 'blue' }}>
            <span>test2</span>
            <Actor name="teste4" style={{ color: 'green' }}>
              <span>teste3</span>
            </Actor>
          </Scene>
        </Stage>
      </div>
    )
  }
}
