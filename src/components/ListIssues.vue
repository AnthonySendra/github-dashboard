<template>
  <md-card class="pr">
    <md-card-header>
      <div class="md-title">{{ title }}</div>
    </md-card-header>

    <md-card-content>
      <md-list class="custom-list md-triple-line">
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
    props: ['query', 'title'],
    data () {
      return {
        issues: []
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
            query: this.query
          }
        },
        update: data => data.search.edges
      }
    }
  }
</script>
