import React, { Component } from 'react'
import CommonPage from 'Pages/Common/CommonPage'
import CommonPage2 from 'Pages/Common/CommonPage2'
import { Stage, Teatrum } from '../../src/Teatrum'

/**
 * Classe resposável por definir todas as rotas do sistema
 */
export default class App extends Component {
  /**
   * É por meio deste render que renderizamos as rotas no index.js
   */
  render() {
    //No momento temos apenas linguagem em PT-BR
    return (
      <Teatrum name="teatrum" init="/">
        <Stage
          name="teste"
          path="/"
          style={{ color: 'red' }}
          component={<CommonPage />}
        />
        <Stage
          name="teste2"
          path="/2"
          style={{ color: 'red' }}
          component={<CommonPage2 />}
        />
      </Teatrum>
    )
  }
}
