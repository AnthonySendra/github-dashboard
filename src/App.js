import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Main from './containers/Main'
import Reboot from 'material-ui/Reboot'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        background: 'linear-gradient(45deg, #5358bb 30%, #5d33ab 90%)',
        boxShadow: '0 3px 5px 2px #6c48ad2b',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px'
      }
    }
  }
})

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
