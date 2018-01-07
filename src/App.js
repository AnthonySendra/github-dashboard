import React, { Component } from 'react'
import { connect, Provider } from 'react-redux'
import store from './store'
import Main from './containers/Main'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
