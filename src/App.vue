<template>
  <div id="app">
    <md-toolbar>
      <md-layout>
        <md-layout md-flex="70" md-flex-medium="50" md-flex-xsmall="100">
          <h1 class="md-title">Github dashboard - {{ username }}</h1>
        </md-layout>

        <md-layout md-flex="30" md-flex-medium="50" md-flex-xsmall="100">
          <md-layout md-flex="70">
            <md-input-container md-has-password md-inline>
              <label>Github Token</label>
              <md-input type="password" v-model="password"></md-input>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="30">
            <md-button>
              <span @click="saveToken">Save</span>
            </md-button>
          </md-layout>
        </md-layout>
      </md-layout>
    </md-toolbar>

    <div class="main-content">
      <router-view :username="username" :members="members" :repositories="repositories"></router-view>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  export default {
    name: 'app',
    data () {
      return {
        password: localStorage.getItem('ghToken') || null,
        username: null,
        members: [],
        repositories: []
      }
    },
    methods: {
      saveToken () {
        localStorage.setItem('ghToken', this.password)
        window.location.reload()
      }
    },
    apollo: {
      username: {
        query: gql`query GetCurrentUser {
          viewer {
            login
          }
        }`,
        update: data => data.viewer.login
      },
      members: {
        query: gql`query GetMembers {
          repositoryOwner(login: "kuzzleio") {
            ... on Organization {
              members(first: 50) {
                edges {
                  node {
                    login
                  }
                }
              }
            }
          }
        }`,
        update: data => data.repositoryOwner.members.edges.map(edge => edge.node.login)
      },
      repositories: {
        query: gql`query GetRepositories {
          repositoryOwner(login: "kuzzleio") {
            repositories(first: 100) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }`,
        update: data => data.repositoryOwner.repositories.edges.map(edge => edge.node.name).sort()
      }
    }
  }
</script>
