import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import { creators } from '../store/github'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  card: {
    padding: 50
  },
  content: {
    marginTop: 40
  },
  cardAction: {
    float: 'right'
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
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Card className={classes.card}>
              <CardContent>
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
              </CardContent>
              <CardActions className={classes.cardAction}>
                <Button onClick={this.saveToken}>Save</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(creators.setToken(token))
})
const MissingTokenStyles = withStyles(styles)(MissingToken)

export default connect(null, mapDispatchToProps)(MissingTokenStyles)
