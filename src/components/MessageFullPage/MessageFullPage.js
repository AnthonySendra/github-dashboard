import React from 'react'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'

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

const MessageFullPage = ({ classes, save, children }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <Grid container justify="center">
        <Card className={classes.card}>
          <CardContent>{children}</CardContent>
          <CardActions className={classes.cardAction}>
            <Button onClick={save}>Save</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(styles)(MessageFullPage)
