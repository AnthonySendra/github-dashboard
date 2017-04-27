<template>
  <md-card class="pr">
    <md-card-header>
      <div class="md-title">{{ title }}</div>
    </md-card-header>

    <!-- FILTERS -->
    <md-card-content>
      <md-layout :md-gutter="true">
        <md-layout md-flex="50" md-flex-medium="50" md-flex-xsmall="100">
          <md-input-container>
            <label for="from">From</label>
            <md-select name="from" id="from" v-model="from">
              <md-option value="all">All</md-option>
              <md-option value="kuzzle">Kuzzle Team</md-option>
              <md-option value="contributors">Contributors</md-option>
            </md-select>
          </md-input-container>
        </md-layout>

        <md-layout md-flex="50" md-flex-medium="50" md-flex-xsmall="100">
          <md-input-container>
            <label for="repository">Repository</label>
            <md-select name="repository" id="repository" v-model="repository">
              <md-option value="all">All</md-option>
              <md-option v-for="repository in repositories" :value="repository" :key="repository">{{repository}}</md-option>
            </md-select>
          </md-input-container>
        </md-layout>
      </md-layout>

      <p v-if="!issues.length">No issue here.</p>
      <md-list v-else class="custom-list md-triple-line">
        <md-list-item v-for="issue in issues" :key="issue.id" :href="issue.node.url" target="_blank">
          <md-avatar>
            <img :src="issue.node.author.avatarURL" alt="issue.node.author.login">
          </md-avatar>

          <div class="md-list-text-container">
            <span>{{ issue.node.title }}</span>
            <span>{{ issue.node.repository.name }}</span>
            <date-time class="date" :date="issue.node.createdAt" format="LLL"></date-time>

            <div class="labels">
              <span v-for="label in issue.node.labels.edges" :key="label.node.id" :style="{color: '#'+label.node.color}">
                {{ label.node.name }}
              </span>
            </div>
          </div>

          <md-button class="md-icon-button md-list-action comments-counter">
            <md-icon :class="{'md-warn': issue.node.comments.totalCount === 0}">chat_bubble_outline</md-icon>
            <div class="total">
              <p v-if="issue.node.comments.totalCount">{{ issue.node.comments.totalCount }}</p>
              <p v-else class="error">0</p>
            </div>
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
    name: 'ListIssues',
    components: {
      DateTime
    },
    props: ['query', 'title', 'members', 'repositories'],
    data () {
      return {
        issues: [],
        from: 'contributors',
        repository: 'all'
      }
    },
    computed: {
      filteredQuery () {
        let _query = this.query

        switch (this.from) {
          case 'contributors':
            _query += ' -author:' + this.members.join(' -author:')
            break
          case 'kuzzle':
            _query += ' author:' + this.members.join(' author:')
            break
        }

        switch (this.repository) {
          case 'all':
            _query += ' user:kuzzleio'
            break
          default:
            _query += ` repo:kuzzleio/${this.repository}`
        }

        return _query
      },
      filteredRepository () {

      }
    },
    apollo: {
      issues: {
        query: gql`query GetIssues ($query: String!) {
          search(type: ISSUE, query: $query, first: 50) {
            edges {
              node {
                ... on Issue {
                  id
                  url
                  author {
                    avatarURL
                    login
                  }
                  title
                  createdAt
                  repository {
                    name
                  }
                  comments(first: 100) {
                    totalCount
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
                }
              }
            }
          }
        }`,
        variables () {
          return {
            query: this.filteredQuery
          }
        },
        update: data => data.search.edges
      }
    }
  }
</script>
