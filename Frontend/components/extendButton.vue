<template lang="html">
  <div>
    <button class="button" v-on:click="extendLoan" type="submit">Förläng lån</button>
  </div>
</template>

<script>
import moment from 'moment'
import { Dialog } from 'buefy/dist/components/dialog'
export default {
  props: ['bookId', 'userId', 'loanDate'],
  data(){
    return {
      userId: this.userId,
      bookId: this.bookId,
      oldLoanDate: this.loanDate,
      newLoanDate: '',
      newReturnDate: ''
    }
  },
  methods: {
    extendLoan(){
      if (this.oldLoanDate === moment().format('YYYY/MM/DD')){
        Dialog.alert({
          title: 'Tyvärr',
          message: 'Det går inte att förlänga det här lånet',
          type: 'is-primary',
        })
      }
      else {
        this.newLoanDate = moment().format('YYYY/MM/DD')
        this.newReturnDate = moment().add(30, 'days').format('YYYY/MM/DD')

        fetch ('http://localhost:3000/loans/extend', {
        body: '{ "returnDate": "' + this.newReturnDate + '", "loanDate": "' + this.newLoanDate +'", "bookId": "' + this.bookId + '", "userId": "' + this.userId + '"}',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
        .then (response => {
          fetch('http://localhost:3000/loans/' + this.userId)
            .then(response => response.json())
            .then (result => {
              let updatedLoans = result
              this.$emit('added-to-loans', updatedLoans)
            })
        })
        Dialog.alert({
          title: 'Klart!',
          message: 'Du har nu förlängt lånet av boken',
          type: 'is-primary',
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
  button {
    /* font-size:15px; */
    background-color: #F3C954;
    border: 2px solid transparent;
    /* padding: 10px 40px; */
    border-radius: 2px;
  }
  button:hover {
    border: 2px solid grey;
  }
</style>
