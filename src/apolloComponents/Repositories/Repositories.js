import React, { Component } from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import { CircularProgress } from 'material-ui/Progress'
import Icon from 'material-ui/Icon'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import RepositoryLine from './RepositoryLine'
import List from 'material-ui/List'

class Repositories extends Component {
  render() {
    const { repositoriesByOwner, handleSelectRepository } = this.props

    if (this.props.data.loading) {
      return <CircularProgress size={50} />
    } else {
      return (
        <div>
          {repositoriesByOwner.map(owner => (
            <ExpansionPanel key={owner.login}>
              <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
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
        avatar: repo.owner.avatarUrl,
        repositories: [repository]
      })
    } else {
      repositoryOwner.repositories.push(repository)
    }
  })

  return repositoriesByOwner
}

export default graphql(RepositoriesAndOwner, {
  props: ({ data }) => ({
    repositoriesByOwner: sortRepositoriesByOwner(data.viewer),
    data
  })
})(Repositories)
