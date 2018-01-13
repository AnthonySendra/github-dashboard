import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return <p>OK {this.props.token}</p>
  }
}

export default connect()(Dashboard)
