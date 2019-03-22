<template>
<div>
  <div id="title">
    <h1>Vi rekommenderar</h1>
    <div class="arrow bounce"></div>
  </div>
  <div class="books">
   <div v-for='book in books.slice(0, 3)' class="book">
      <img src="https://cdn.pixabay.com/photo/2015/12/04/17/06/notebook-1076812_960_720.jpg">
      <h3>{{book.title}}</h3>
      <p>{{book.author}} | {{book.category}}</p>
      <p><loan-button></loan-button></p>
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
  width:90%;
  margin:auto;
  }

  .book {
  line-height:0.5em;
    width: 30%;
    display: inline-block;
    margin: 1%;
  }

  .book img {
    width:100%;
    height:250px;
    object-fit: cover;
  }
  .arrow {
    position: relative;
    bottom: 1px;
    left: 50%;
    margin-left:-20px;
    margin-top: -10px;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-image: url(http://greenish.haahe.net/wp-content/uploads/2018/12/index.png);
    background-size: contain;
  }
  .bounce {
    animation: bounce 2s infinite;
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-30px);
    }
    60% {
      transform: translateY(-15px);
    }
  }
</style>
