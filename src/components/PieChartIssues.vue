<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{ title }}</div>
    </md-card-header>
    <md-card-content>
      <vue-chart
        chart-type="PieChart"
        :columns="columns"
        :rows="groupRows"
      ></vue-chart>
    </md-card-content>
  </md-card>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'PieChartIssues',
    props: ['query', 'title'],
    data () {
      return {
        columns: [{
          'type': 'string',
          'label': 'Project'
        }, {
          'type': 'number',
          'label': 'Number'
        }],
        rows: []
      }
    },
    computed: {
      groupRows () {
        let groups = {}
        this.rows.forEach((row) => {
          if (!groups[row.node.repository.name]) {
            groups[row.node.repository.name] = 0
          }
          groups[row.node.repository.name]++
        })

        return Object.keys(groups).map(groupName => {
          return [groupName, groups[groupName]]
        })
      }
    },
    apollo: {
      rows: {
        query: gql`query GetIssues ($query: String!) {
          search(type: ISSUE, query: $query, first: 50) {
            edges {
              node {
                ... on PullRequest {
                  repository {
                    name
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
