import React, { Component } from 'react'
import { Stage } from '../../../../src/Staff'
export default class CommonPage extends Component {
  /**
   * Renderiza o componente
   */
  render() {
    debugger
    console.log(Stage)
    return (
      <div>
        <span>hello</span>
        <Stage style={{ color: 'red' }} />
      </div>
    )
  }
}
