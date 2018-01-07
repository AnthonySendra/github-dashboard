import React from 'react'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing.unit * 2
  }
})

const MissingToken = ({ classes }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Paper className={classes.paper}>
          <Typography type="headline" component="h1">
            OOPS.
          </Typography>
          <Typography type="headline" component="h2">
            No Github token found.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(styles)(MissingToken)
