<template>
  <md-card>
    <md-card-header>
      <div class="md-title">My PRs</div>
      <div class="md-subhead">Subtitle here</div>
    </md-card-header>

    <md-card-content>
      <md-list class="custom-list md-triple-line">
        <md-list-item v-for="pr in prs" :key="pr.id">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/1" alt="People">
          </md-avatar>

          <div class="md-list-text-container">
            <span>Ali Connors</span>
            <span>Brunch this weekend?</span>
            <p>I'll be in your neighborhood doing errands...</p>
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
  export default {
    name: 'List',
    data () {
      return {
        prs: [
          { id: 'toto' }
        ]
      }
    }
  }
</script>
