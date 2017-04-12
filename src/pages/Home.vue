<template>
  <md-layout md-gutter>
    <md-layout>
      <list></list>
    </md-layout>
  </md-layout>
</template>

<script>
  import List from '../components/List'

  export default {
    name: 'Home',
    components: {
      List
    }
  }
</script>
