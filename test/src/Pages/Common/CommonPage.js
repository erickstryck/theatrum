import React, { Component } from 'react'
import { Stage } from '../../../../src/Staff'
export default class CommonPage extends Component {
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
        </Stage>
      </div>
    )
  }
}
