<template>
  <span>{{ formattedDate }}</span>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'DateTime',
    props: ['locale', 'date', 'format'],
    computed: {
      formattedDate () {
        let date = this.date
        return moment(date).locale('fre-fr').format(this.format)
      }
    }
  }
</script>
