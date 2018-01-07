import React, { Component } from 'react'
import { connect } from 'react-redux'
import MissingToken from '../components/MissingToken'
import Dashboard from './Dashboard'

class Main extends Component {
  render() {
    if (!this.props.token) {
      return <MissingToken />
    }

    return <Dashboard />
  }
}

const mapStateToProps = state => ({
  token: state.github.token
})

export default connect(mapStateToProps, null)(Main)
