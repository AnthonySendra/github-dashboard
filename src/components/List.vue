<template>
  <md-card>
    <md-card-header>
      <div class="md-title">My PRs</div>
      <div class="md-subhead">Subtitle here</div>
    </md-card-header>

    <md-card-content>
      <md-list class="custom-list md-triple-line">
        <md-list-item v-for="pr in repository.pullRequests.edges" :key="pr.id">
          <md-avatar>
            <img :src="pr.node.author.avatarURL" alt="pr.node.author.login">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ pr.node.title }}</span>
            <span>{{ pr.node.repository.name }}</span>
            <p>{{ pr.node.createdAt }}</p>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">star</md-icon>
          </md-button>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'List',
    data () {
      return {
        repository: {
          pullRequests: {
            edges: []
          }
        }
      }
    },
    apollo: {
      repository: gql`query GetPRs {
        repository(owner: "kuzzleio" name: "kuzzle") {
          pullRequests(labels: "changelog:bug-fixes", states: OPEN, first: 10) {
            edges {
              node {
                author {
                  avatarURL
                  login
                }
                title
                repository {
                  name
                }
                createdAt
              }
            }
          }
        }
      }`
    }
  }
</script>
