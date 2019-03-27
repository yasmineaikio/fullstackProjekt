<template>
<div>
  <form>
    <button v-on:click="addLoan" type="submit">Låna</button>
  </form>
</div>
</template>

<script>
export default {
  props: ['bookId'],
  data() {
      return {
        loanDate: '2019-03-27',
        returnDate: '2019-04-27',
        bookId: this.bookId,
        userId: ''
      }
    },
  methods: {
    addLoan (){
      console.log(this.bookId);
      fetch ('http://localhost:3000/loans', {
      body: '{ "loanDate": "' + this.loanDate + '", "returnDate": "' + this.returnDate +'", "userId": "' + this.userId + '", "bookId": "'
      + this.bookId + '"}',
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'POST'
    })

      .then (response => response.json())
      .then (result => {
        console.log();
      })
    }
  }
}
</script>

<style scoped>
button{
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
