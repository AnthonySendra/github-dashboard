import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import MessageFullPage from '../../components/MessageFullPage/MessageFullPage'
import { creators } from '../../store/github'

const styles = theme => ({
  content: {
    marginTop: 40
  }
})

class MissingToken extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null
    }
  }

  handleTokenChange = event => {
    this.setState({
      token: event.target.value
    })
  }

  saveToken = () => {
    this.props.setToken(this.state.token)
  }

  onKeyPress = event => {
    if (event.key === 'Enter') {
      this.saveToken()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <MessageFullPage save={this.saveToken}>
        <Typography type="display3" align="center">
          OOPS.
        </Typography>
        <Typography type="display2" align="center">
          No Github token found.
        </Typography>
        <Typography className={classes.content} type="subheading" paragraph align="center">
          To access the dashboard, you must first create an Access Token on github:
        </Typography>
        <Typography type="subheading" paragraph align="center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/settings/tokens/new?description=Github%20Dashboard&scopes=repo:status,read:org,read:user"
          >
            Click here to generate an Access Token
          </a>
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="name"
            label="Paste your Github Token here"
            margin="normal"
            fullWidth
            onChange={this.handleTokenChange}
            onKeyPress={this.onKeyPress}
          />
        </form>
      </MessageFullPage>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(creators.setToken(token))
})
const MissingTokenStyles = withStyles(styles)(MissingToken)

export default connect(null, mapDispatchToProps)(MissingTokenStyles)
