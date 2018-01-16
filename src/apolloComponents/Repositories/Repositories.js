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
import { withStyles } from 'material-ui/styles'
import { withApollo } from 'react-apollo'

const styles = theme => ({
  content: {
    height: 300,
    overflowY: 'scroll'
  }
})

class Repositories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      loading: true,
      viewer: null
    }
  }

  async componentWillMount() {
    const viewer = await this.executeGetRepositories()

    //this.setState({ loading: false, viewer: result.data.viewer })
  }

  async executeGetRepositories(data = null) {
    const result = await this.props.client.query({ query: getRepositories })
    const organizations = result.data.viewer.organizations.nodes
      .filter(orga => orga.repositories.pageInfo.hasNextPage)
      .map(orga => orga)

    // PARRALEL
    const moreRepositories = {}
    organizations.forEach(organization => {
      moreRepositories[organization.login] = []
    })

    console.log(moreRepositories)

    return data
  }

  async executeGetRepositoriesForOrganization(data, login, cursor) {}

  handleFilterChange = event => {
    this.setState({ filter: event.target.value })
  }
  /*
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
*/
  render() {
    const { handleSelectRepository, classes } = this.props

    if (this.state.loading || !this.state.viewer) {
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
          <ExpansionPanel key={this.state.viewer.login}>
            <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
              <Typography>
                <img heigh="25px" width="25px" src={this.state.viewer.avatarUrl} />
              </Typography>
              <Typography>{this.state.viewer.login}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.content}>
              <List disablePadding dense>
                {this.state.viewer.repositories.nodes.map(repository => (
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
          {this.state.viewer.organizations.nodes.map(orga => (
            <ExpansionPanel key={orga.login}>
              <ExpansionPanelSummary expandIcon={<Icon>keyboard_arrow_down</Icon>}>
                <Typography>
                  <img heigh="25px" width="25px" src={orga.avatarUrl} />
                </Typography>
                <Typography>{orga.login}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.content}>
                <List disablePadding dense>
                  {orga.repositories.nodes.map(repository => (
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

const getRepositories = gql`
  query getRepositories {
    viewer {
      organizations(first: 100) {
        nodes {
          login
          avatarUrl(size: 25)
          repositories(
            first: 100
            affiliations: [OWNER]
            orderBy: { field: NAME, direction: ASC }
          ) {
            nodes {
              name
              url
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
      repositories(first: 100, affiliations: [OWNER], orderBy: { field: NAME, direction: ASC }) {
        nodes {
          name
          url
        }
      }
      login
      avatarUrl(size: 25)
    }
  }
`

const getRepositoriesForOrganization = gql`
  query getRepositories($login: String!, $cursor: String!) {
    organization(login: $login) {
      repositories(
        first: 100
        after: $cursor
        affiliations: [OWNER]
        orderBy: { field: NAME, direction: ASC }
      ) {
        nodes {
          name
          url
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

const RepositoriesWithStyles = withStyles(styles)(Repositories)
export default withApollo(RepositoriesWithStyles)
