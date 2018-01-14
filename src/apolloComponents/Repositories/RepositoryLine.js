import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  line: {
    height: 40,
    fontSize: 20
  }
})

const RepositoryLine = ({ classes, name, url, handleSelectRepository }) => (
  <ListItem
    dense
    button
    disableGutters
    divider
    onClick={handleSelectRepository(name)}
    className={classes.line}
  >
    <Checkbox tabIndex={-1} />
    <ListItemText primary={name} />
  </ListItem>
)

export default withStyles(styles)(RepositoryLine)
