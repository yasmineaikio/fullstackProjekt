<template>
<div>
  <div id="title">
    <h1>Topplista</h1>
  </div>
  <div class="books">
   <div v-for='book in books.slice(0, 8)' class="book">
  <img src="https://cdn.pixabay.com/photo/2017/03/27/13/03/book-2178586_960_720.jpg">
  <div class="container">
    <h3>{{book.title}}</h3>
    <p>{{book.author}}</p>
    <p><loan-button></loan-button></p>
  </div>
</div>
</div>
</div>
</template>

<script>
import LoanButton from './loanbutton.vue'
  export default {
    data() {
      return {
        books: []
      }
    },
        created() {
            fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(result => {
            this.books = result
        })
      },
          components: {
            'loan-button': LoanButton,
          }
      }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro|Work+Sans');

  #title h1 {
  color: #7A7A7A;
  font-family: 'Source serif pro', sans-serif;
  font-size: 3.0em;
  font-weight: 600;
}

  #title {
    position: relative;
    text-align: center;
  }

  .books {
  text-align: center;
  font-family: 'Work Sans', sans-serif;
  }

  .book {
    border: 1px solid #7A7A7A;
    width: 20%;
    display: inline-block;
    margin: 1%;
  }

  .book img {
    width:100%;
  }

</style>
