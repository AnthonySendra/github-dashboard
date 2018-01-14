import React, { Component } from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import { CircularProgress } from 'material-ui/Progress'
import Icon from 'material-ui/Icon'
import Grid from 'material-ui/Grid'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import RepositoryLine from './RepositoryLine'
import List from 'material-ui/List'
import TextField from 'material-ui/TextField'

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: ''
    }
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value })
  }

  filteredRepositoriesByOwner = () => {
    const { repositoriesByOwner } = this.props

    if (!repositoriesByOwner) {
      return []
    }

    if (this.state.filter === '') {
      return repositoriesByOwner
    }

    return repositoriesByOwner
      .filter(owner =>
        owner.repositories.find(repository => repository.name.indexOf(this.state.filter) !== -1)
      )
      .map(owner => {
        return {
          ...owner,
          repositories: owner.repositories.filter(
            repository => repository.name.indexOf(this.state.filter) !== -1
          )
        }
      })
  }

  render() {
    const { handleSelectRepository } = this.props

    if (this.props.data.loading) {
      return (
        <Grid container justify="center">
          <Grid item xs={2}>
            <CircularProgress size={50} />
          </Grid>
        </Grid>
      )
    } else {
      return (
        <div>
          <form noValidate autoComplete="off">
            <TextField
              id="name"
              label="Filter the repositories"
              margin="normal"
              fullWidth
              onChange={this.handleFilterChange}
            />
          </form>
          {this.filteredRepositoriesByOwner().map(owner => (
            <ExpansionPanel key={owner.login}>
              <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
                <Typography>
                  <img src={owner.avatarUrl} />
                </Typography>
                <Typography>{owner.login}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List disablePadding dense>
                  {owner.repositories.map(repository => (
                    <RepositoryLine
                      key={repository.name}
                      name={repository.name}
                      url={repository.url}
                      handleSelectRepository={handleSelectRepository}
                    />
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      )
    }
  }
}

const RepositoriesAndOwner = gql`
  query RepositoriesAndOwner {
    viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        nodes {
          url
          name
          id
          owner {
            avatarUrl(size: 25)
            login
          }
        }
      }
    }
  }
`

const sortRepositoriesByOwner = viewer => {
  const repositoriesByOwner = []

  if (!viewer) {
    return []
  }

  viewer.repositories.nodes.forEach(repo => {
    let repository = { url: repo.url, name: repo.name }
    let repositoryOwner = repositoriesByOwner.find(
      ownerRepositories => ownerRepositories.login === repo.owner.login
    )

    if (!repositoryOwner) {
      repositoriesByOwner.push({
        login: repo.owner.login,
        avatarUrl: repo.owner.avatarUrl,
        repositories: [repository]
      })
    } else {
      repositoryOwner.repositories.push(repository)
      repositoryOwner.repositories.sort((a, b) => (a.name < b.name ? -1 : 1))
    }
  })

  return repositoriesByOwner.sort((a, b) => (a.login < b.login ? -1 : 1))
}

export default graphql(RepositoriesAndOwner, {
  props: ({ data }) => ({
    repositoriesByOwner: sortRepositoriesByOwner(data.viewer),
    data
  })
})(Repositories)
