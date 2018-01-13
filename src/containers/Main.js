import React, { Component } from 'react'
import { connect } from 'react-redux'
import MissingToken from './MissingToken/MissingToken'
import SelectRepositories from './SelectRepositories/SelectRepositories'
import { ApolloProvider } from 'react-apollo'
import getApolloClient from '../services/apollo'

class Main extends Component {
  render() {
    if (!this.props.token) {
      return <MissingToken />
    }

    return (
      <ApolloProvider client={getApolloClient(this.props.token)}>
        <SelectRepositories />
      </ApolloProvider>
    )
  }
}

const mapStateToProps = state => ({
  token: state.github.token
})

export default connect(mapStateToProps, null)(Main)
