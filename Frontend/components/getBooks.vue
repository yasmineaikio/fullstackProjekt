<template>
  <div class="container">
  <add-book v-if="admin"></add-book>
  <search-field></search-field>
  <h3>Böcker</h3>
  <table>
  <tr>
    <th>Titel</th>
    <th>Författare</th>
    <th>Kategori</th>
    <th>Utgivningår</th>
    <th>Språk</th>
    <th>Låna</th>
  </tr>
  <tr v-for='book in books'>
    <td>{{book.title}}</td>
    <td>{{book.author}}</td>
    <td>{{book.category}}</td>
    <td>{{book.year}}</td>
    <td>{{book.language}}</td>
    <td><loan-button
      v-bind:book-id="book.id"
      ></loan-button></td>
  </tr>
  </table>
  </div>
</template>
<script>
  import AddBook from './addBook.vue'
  import LoanButton from './loanButton.vue'
  export default {
    data() {
      return {
        titel: '',
        author: '',
        category: '',
        year: '',
        language: '',
        admin: false,
        books: [],
      }
    },

        created() {
            fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(result => {
            this.books = result
        })
      },

    //   created() {
    //       fetch('http://localhost:3000/books?order-by=title')
    //       .then(response => response.json())
    //       .then(result => {
    //       this.books = result
    //   })
    // },

    components: {
      'add-book': AddBook,
      'loan-button': LoanButton
    },
    methods: {
      getBooks() {
        fetch('http://localhost:3000/books')
        .then(function(response) {
          return response.json()
        })
        .then(function(result){
          console.log(result)
      })
    }
    },

    created() {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(result => {
        this.books = result
    })
   },

    mounted() {
      // Kollar om inloggad user är ADMIN eller inte (Alex)
      fetch('http://localhost:3000/login')
      .then(response => {
          return response.json()
      })
      .then(result => {
          let inloggad = result.find(value => value.user === 'ADMIN')
          if(inloggad.user === 'ADMIN' && inloggad.token === this.$cookie.get('Cookie') && inloggad.type === 'admin' ) {
            this.admin = true
          }
      })
    },
}
</script>

<style scoped>
.container {
 margin: 2em;
}
h3  {
  width: 80%;
  margin: auto;
  padding: 20px
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: auto;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>
