<template lang="html">
  <div>
    {{count}}
  </div>
</template>

<script>
import moment from 'moment'
// import EventBus from '../eventbus'
export default {
  props: ['returnDate'],
  data(){
    return {
      count: null,
      return: this.returnDate
    }
  },
  created(){
    this.countDown()
    // EventBus.$on('extended', this.onExtended)
  },
  methods: {
    countDown(){
      fetch('http://localhost:3000/loans/')
      .then(response => response.json())
      .then (result => {
        let todaysDate = moment().format('YYYY/MM/DD')
        this.count = moment(this.return, 'YYYY/MM/DD').diff(todaysDate, 'days')
      })
    },
    // onExtended(object){
    //   this.return = object.returnDate
    //   this.countDown()
    // }
  },
}
</script>

<style lang="css" scoped>
</style>
