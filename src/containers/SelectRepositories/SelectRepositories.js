import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import { creators } from '../../store/github'
import MessageFullPage from '../../components/MessageFullPage/MessageFullPage'
import Repositories from '../../apolloComponents/Repositories/Repositories'

class SelectRepositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      repositories: []
    }
  }

  handleSelectRepository = name => () => {}

  saveRepositories = () => {
    this.props.setRepositories(this.state.repositories)
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.saveToken()
    }
  }

  render() {
    return (
      <MessageFullPage save={this.saveRepositories}>
        <Typography type="display3" align="center">
          Select the repositories you want to follow
        </Typography>
        <Typography type="subheading" paragraph align="center">
          You will be able to change the followed repositories at any time.
        </Typography>
        <Repositories handleSelectRepository={this.handleSelectRepository} />
      </MessageFullPage>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setRepositories: repositories => dispatch(creators.setRepositories(repositories))
})

export default connect(null, mapDispatchToProps)(SelectRepositories)
