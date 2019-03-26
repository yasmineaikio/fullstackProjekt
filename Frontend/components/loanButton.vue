<template>
<div>
  <form>
    <button v-on:click="addLoan" type="submit">Låna</button>
  </form>
</div>
</template>

<script>
export default {
  data() {
      return {
        loanDate: '2019-04-14',
        returnDate: '2019-05-14',
        bookId: '',
        userId: ''
      }
    },
  methods: {
    addLoan (){
      fetch ('http://localhost:3000/loans', {
      body: '{ "loanDate": "' + this.loanDate + '", "returnDate": "' + this.returnDate +'", "bookId": "'
      + this.bookId + '", "userId": "' + this.userId + '"}',
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
