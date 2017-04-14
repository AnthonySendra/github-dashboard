<template>
  <md-layout :md-gutter="true">
    <!-- PR to review (state open and not already approved or refused) -->
    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" :md-column="true">
      <list-pr :query="prsToReviewQuery" title="PRs to review"></list-pr>
    </md-layout>
    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" :md-column="true">
      <md-layout :md-column="true">
        <list-pr :query="myPrsQuery" title="My PRs"></list-pr>
        <list-pr :query="myPrsNeedChangeQuery" title="My PRs - need changes"></list-pr>
      </md-layout>
    </md-layout>

    <md-layout md-flex="33" md-flex-medium="50" md-flex-xsmall="100" :md-column="true">
      <list-issues :query="issuesNotFromKuzzleQuery" title="Issues from contributors"></list-issues>
    </md-layout>
    <!--  My PRs still open with comment number -->
    <!-- PRs with responses on my feedback -->
    <!-- All open issues (with dropdown on project) -->
    <!-- New issue from contributors -->
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
    props: ['username', 'members'],
    components: {
      ListPr,
      ListIssues
    },
    computed: {
      prsToReviewQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip -reviewed-by:' + this.username + ' -assignee:' + this.username
      },
      myPrsQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip assignee:' + this.username
      },
      myPrsNeedChangeQuery () {
        return 'is:open type:pr user:kuzzleio sort:created-desc -label:wip review:changes_requested assignee:' + this.username
      },
      issuesNotFromKuzzleQuery () {
        return 'is:open type:issue state:open user:kuzzleio sort:created-desc -author:' + this.members.join(' -author:')
      }
    }
  }
</script>
