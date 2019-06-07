import React, { Component } from 'react'
import { Scene, Actor, Staff } from '../../../../src/Teatrum'
var interval = 0
export default class CommonPage extends Component {
  /**
   * Renderiza o componente
   */
  render() {
    return (
      <Scene name="teste2" style={{ color: 'blue' }}>
        <Actor
          name="teste4"
          style={{
            color: 'green',
            borderStyle: 'solid',
            borderWidth: 5,
            width: 900,
            height: 600,
          }}
          onMouseMove={e => {
            e.persist()
            if (e.buttons && (e.movementX != 0 || e.movementY != 0)) {
              setTimeout(() => {
                Staff.setChildren(
                  'actor_teste4',
                  <span
                    style={{
                      position: 'absolute',
                      top: e.clientY,
                      left: e.clientX,
                      fontSize: 10,
                    }}
                  >
                    &bull;
                  </span>
                )
              }, 10)
            }
          }}
        />
      </Scene>
    )
  }
}
