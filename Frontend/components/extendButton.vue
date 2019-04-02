<template lang="html">
  <div>
    <form>
      <button v-on:click="extendLoan" type="submit">Förläng lån</button>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
import { Dialog } from 'buefy/dist/components/dialog'
export default {
  props: ['bookId', 'userId'],
  data(){
    return {
      userId: this.userId,
      bookId: this.bookId,
      newLoanDate: '',
      newReturnDate: ''
    }
  },
  methods: {
    extendLoan(){
      this.newLoanDate = moment().format('YYYY/MM/DD')
      this.newReturnDate = moment().add(30, 'days').format('YYYY/MM/DD')

        fetch ('http://localhost:3000/loans/extend', {
        body: '{ "returnDate": "' + this.newReturnDate + '", "loanDate": "' + this.newLoanDate +'", "bookId": "' + this.bookId + '"}',
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
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
          type: 'is-dark',
        })
    }
  }
}
</script>

<style lang="css" scoped>
  button {
    font-size:15px;
    background-color: #F3C954;
    border: 2px solid transparent;
    padding: 10px 40px;
    border-radius: 2px;
    font-family: 'Work Sans', sans-serif;
  }
  button:hover {
    border: 2px solid grey;
  }
</style>
