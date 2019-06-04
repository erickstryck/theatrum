import React, { Component } from 'react'
import { Scene, Actor, Staff } from '../../../../src/Teatrum'
var interval = 0
export default class CommonPage extends Component {
  componentDidMount() {
    var myArray = ['red', 'green', 'blue', 'yellow', 'black']
    interval = setInterval(() => {
      Staff.setAttribute('actor_teste4', {
        style: {
          color: myArray[Math.floor(Math.random() * myArray.length)],
          fontSize: 70,
          position: 'relative',
          top: Math.floor(Math.random() * 400),
          left: Math.floor(Math.random() * 600),
        },
      })
    }, 60)

    setTimeout(() => {
      Staff.stagePush('teatrum', '/2')
    }, 3000)
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

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
