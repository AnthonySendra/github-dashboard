<template>
  <md-layout :md-gutter="true">
    <!-- PR to review (state open and not already approved or refused) -->
    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" :md-column="true">
      <list-pr :query="prsToReviewQuery" title="PRs to review"></list-pr>
    </md-layout>

    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" md-column>
      <list-pr :query="myPrsQuery" title="My PRs"></list-pr>
      <list-pr :query="myPrsNeedChangeQuery" title="My PRs - need changes"></list-pr>
    </md-layout>

    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" md-flex-small="100" :md-column="true">
      <list-issues :query="issuesQuery" title="Issues" :members="members" :repositories="repositories"></list-issues>
    </md-layout>
    <!--  My PRs still open with comment number -->
    <!-- PRs with responses on my feedback -->
    <!-- Last report -->
    <!-- Pie chart PRs open by project -->
    <!-- Line chart issues open by project -->
  </md-layout>
</template>

<script>
  import ListPr from '../components/ListPr'
  import ListIssues from '../components/ListIssues'

  export default {
    name: 'Home',
    props: ['username', 'members', 'repositories'],
    components: {
      ListPr,
      ListIssues
    },
    computed: {
      prsToReviewQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip -reviewed-by:' + this.username + ' -author:' + this.username
      },
      myPrsQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip author:' + this.username
      },
      myPrsNeedChangeQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip review:changes_requested author:' + this.username
      },
      issuesQuery () {
        return 'is:open type:issue state:open sort:created-desc'
      }
    }
  }
</script>
