import React, { Component } from 'react'
import { Stage, Scene, Actor, Staff } from '../../../../src/Teatrum'
export default class CommonPage extends Component {
  componentDidMount() {
    debugger
    setInterval(() => {
      var myArray = ['red', 'green', 'blue', 'yellow', 'black']
      var keys = Staff.keys()
      let idx = Math.floor(Math.random() * keys.length)
      Staff.setAttribute(keys[idx], {
        style: {
          color: myArray[Math.floor(Math.random() * myArray.length)],
          fontSize: 70,
          position: 'relative',
          top: Math.floor(Math.random() * 400),
          left: Math.floor(Math.random() * 600),
        },
      })
      idx = Math.floor(Math.random() * keys.length)
      Staff.setAttribute(keys[idx], {
        style: {
          width: 900,
          height: 500,
          backgroundColor: myArray[Math.floor(Math.random() * myArray.length)],
          position: 'fixed',
          top: Math.floor(Math.random() * 400),
          left: Math.floor(Math.random() * 600),
        },
      })
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
