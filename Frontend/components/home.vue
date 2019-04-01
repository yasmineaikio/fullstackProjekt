<template>
<div>
  <div id="title">
    <h1>Vi rekommenderar</h1>
    <div class="arrow bounce"></div>
  </div>

  <div class="container is-fluid">
    <div class="columns is-multiline">
      <div v-for='book in books.slice(0, 4)' class="column is-one-quarter">
        <div class="card is-fullimage">
        <figure class="image is-3by4">
          <img v-bind:src="book.image"/>
        </figure>
          <div class="card-content">
            <div class="media-content">
              <h3>{{book.title}}</h3>
              <p>{{book.author}} | {{book.category}}</p>
              <br>
              <div class="loanButton has-text-centered"><loan-button
                v-bind:book-id="book.id"
                ></loan-button></div>
            </div>
          </div>
    </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import LoanButton from './loanButton.vue'
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

<style>
/* stilregler som gäller för alla filer */
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro|Work+Sans');
  p, li, table, input, button, a {
    font-family: 'Work sans', sans-serif;
  }
  h1, h2 {
    font-family: 'Source serif pro', serif;

  }
  .arrow {
    position: relative;
    bottom: 1px;
    left: 50%;
    margin-left:-20px;
    margin-top: 30px;
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

<style scoped>
  #title h1 {
  color: #7A7A7A;
  font-family: 'Source serif pro', sans-serif;
  font-size: 3.0em;
}

  h3 {
  font-size: 1.4em;
  font-family: 'Source serif pro', sans-serif;
  }

  #title {
    position: relative;
    text-align: center;
    margin-top: 40px;
  }

.card {
  height: 100%;
}
</style>
