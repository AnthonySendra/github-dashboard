<template>
  <md-layout :md-gutter="true">
    <!-- PR to review (state open and not already approved or refused) -->
    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" :md-column="true">
      <list-pr :query="prsToReviewQuery" title="PRs to review" :include-filter="true" :filter-project="filterProjectPr"></list-pr>
      <pie-chart-issues :query="prCountQuery" title="PRs by project" @select-project="addFilterProjectPr" ></pie-chart-issues>
    </md-layout>

    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" md-column>
      <list-pr :query="myPrsQuery" title="My PRs"></list-pr>
      <list-pr :query="myPrsNeedChangeQuery" title="My PRs - need changes"></list-pr>
    </md-layout>

    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" :md-column="true">
      <list-issues :query="issuesQuery" title="Issues" :members="members" :repositories="repositories" :include-filter="true"></list-issues>
    </md-layout>
  </md-layout>
</template>

<script>
  import ListPr from '../components/ListPr'
  import ListIssues from '../components/ListIssues'
  import PieChartIssues from '../components/PieChartIssues'

  export default {
    name: 'Home',
    props: ['username', 'members', 'repositories'],
    data () {
      return {
        columns: [{
          'type': 'string',
          'label': 'Date'
        }, {
          'type': 'number',
          'label': 'Issues'
        }],
        rows: [
          ['2004', 1000],
          ['2005', 1170],
          ['2006', 660],
          ['2007', 1030]
        ],
        filterProjectPr: null
      }
    },
    components: {
      ListPr,
      ListIssues,
      PieChartIssues
    },
    computed: {
      prsToReviewQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip -reviewed-by:' + this.username + ' -author:' + this.username
      },
      myPrsQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc author:' + this.username
      },
      myPrsNeedChangeQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip review:changes_requested author:' + this.username
      },
      issuesQuery () {
        return 'is:open type:issue state:open sort:created-desc'
      },
      prCountQuery () {
        return 'is:open type:pr user:kuzzleio -label:wip'
      }
    },
    methods: {
      addFilterProjectPr (event) {
        this.filterProjectPr = event
      }
    }
  }
</script>
