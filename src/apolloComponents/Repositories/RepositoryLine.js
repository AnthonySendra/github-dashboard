import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import { ListItem, ListItemText } from 'material-ui/List'

export default ({ name, url, handleSelectRepository }) => (
  <ListItem dense button disableGutters divider onClick={handleSelectRepository(name)}>
    <Checkbox tabIndex={-1} />
    <ListItemText primary={name} />
  </ListItem>
)
