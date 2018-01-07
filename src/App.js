import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Main from './containers/Main'
import Reboot from 'material-ui/Reboot'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Reboot />
          <Main />
        </MuiThemeProvider>
      </Provider>
    )
  }
}
