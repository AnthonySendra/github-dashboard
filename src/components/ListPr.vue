<template>
  <md-card class="pr">
    <md-card-header>
      <div class="md-title">
        <a :href="'https://github.com/search?utf8=✓&q=' + query" target="_blank">
          {{ title }} ({{ filteredPrs.length }}) <span v-if="filterProject">- {{ filterProject }}</span>
        </a>
      </div>
    </md-card-header>

    <md-card-content>
      <md-layout :md-hide-medium="true" v-if="includeFilter">
        <md-input-container md-inline :md-hide-small="true">
          <label>Filter</label>
          <md-input v-model="filter"></md-input>
        </md-input-container>
      </md-layout>
      <p v-if="!prs.length" class="nothing-there">No Pull Request here.</p>
      <md-list v-else class="custom-list md-triple-line">
        <md-list-item v-for="pr in filteredPrs" :key="pr.id" :href="pr.node.url" target="_blank">
          <md-avatar>
            <img :src="pr.node.author.avatarUrl" alt="pr.node.author.login">
          </md-avatar>

          <div class="md-list-text-container">
            <span class="title">{{ pr.node.title }}</span>
            <span>{{ pr.node.repository.name }}</span>
            <date-time class="date" :date="pr.node.createdAt" format="LLL"></date-time>

            <div class="labels">
              <span v-for="label in pr.node.labels.edges" :key="label.node.id" :style="{color: '#'+label.node.color}">
                {{ label.node.name }}
              </span>
            </div>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon v-if="state(pr, 'SUCCESS')" class="md-primary">check</md-icon>
            <md-icon v-else-if="state(pr, 'FAILURE')" class="md-warn">close</md-icon>
          </md-button>

          <md-divider class="md-inset"></md-divider>
        </md-list-item>
      </md-list>
    </md-card-content>
  </md-card>
</template>

<script>
  import gql from 'graphql-tag'
  import DateTime from './Common/DateTime'

  export default {
    name: 'ListPr',
    components: {
      DateTime
    },
    props: ['query', 'title', 'includeFilter', 'filterProject'],
    data () {
      return {
        prs: [],
        filter: ''
      }
    },
    methods: {
      state (pr, state) {
        return pr.node.commits &&
          pr.node.commits.edges[0] &&
          pr.node.commits.edges[0].node &&
          pr.node.commits.edges[0].node.commit.status &&
          pr.node.commits.edges[0].node.commit.status.state === state
      },
      stateDescriptions (pr) {
        if (!pr.node.commits ||
          !pr.node.commits.edges[0] ||
          !pr.node.commits.edges[0].node ||
          !pr.node.commits.edges[0].node.commit.status) {
          return []
        }

        return pr.node.commits.edges[0].node.commit.status.contexts.map((context) => {
          return context.description
        })
      }
    },
    computed: {
      filteredPrs () {
        return this.prs
          .filter(pr => {
            if (!this.filter) {
              return true
            }
            return pr.node.title.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
          })
          .filter(pr => {
            if (!this.filterProject) {
              return true
            }
            return pr.node.repository.name.toLowerCase().indexOf(this.filterProject.toLowerCase()) !== -1
          })
      }
    },
    apollo: {
      prs: {
        query: gql`query GetPRs ($query: String!) {
          search(type: ISSUE, query: $query, first: 50) {
            edges {
              node {
                ... on PullRequest {
                  id
                  url
                  author {
                    avatarUrl
                    login
                  }
                  title
                  createdAt
                  repository {
                    name
                  }
                  labels(first: 10) {
                    edges {
                      node {
                        id
                        name
                        color
                      }
                    }
                  }
                  commits(last:1) {
                    edges {
                      node {
                        commit {
                          status {
                            state
  #                          contexts {
  #                            description
  #                          }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
        variables () {
          return {
            query: this.query
          }
        },
        update: data => data.search.edges
      }
    }
  }
</script>
