import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import CommonPage from 'Pages/Common/CommonPage'

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
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/" render={() => <CommonPage />} />
        </Switch>
      </Router>
    )
  }
}
