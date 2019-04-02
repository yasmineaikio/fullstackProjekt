<template>
  <div class="container">
  <add-book v-if="admin"></add-book>
  <search-field></search-field>
  
  <table class="table is-hoverable">
  <thead>
  <tr>
    <th>Bokomslag</th>
    <th v-on:click = "sortBooks('title')">Titel</th>
    <th v-on:click = "sortBooks('author')">Författare</th>
    <th v-on:click = "sortBooks('category')">Kategori</th>
    <th v-on:click = "sortBooks('year')">Utgivningår</th>
    <th v-on:click = "sortBooks('language')">Språk</th>
    <th v-if="!admin">Låna</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for='book in books'>
    <td><img v-bind:src="book.image"/></td>
    <td>{{book.title}}</td>
    <td>{{book.author}}</td>
    <td>{{book.category}}</td>
    <td>{{book.year}}</td>
    <td>{{book.language}}</td>
    <td v-if="!admin"><loan-button v-bind:book-id="book.id"></loan-button></td>
  </tr>
  </tbody>
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
        sort: null,
        
      }
    },

    created() {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(result => {
        this.books = result
    })
    
  },
    // sotera böcker (Elin)
    methods: {
      sortBooks(s) {
        console.log(s);
      fetch('http://localhost:3000/books/sort/' + s)
      .then(response => response.json())
      .then(result => {
      this.books = result
      })
    }
  },    

    components: {
      'add-book': AddBook,
      'loan-button': LoanButton
    },

    mounted() {
      // Kollar om inloggad user är ADMIN eller inte (Alex)
      fetch('http://localhost:3000/login')
      .then(response => {
          return response.json()
      })
      .then(result => {
          let inloggad = result.find(value => value.user === 'ADMIN')
          if(inloggad.user === 'ADMIN' && inloggad.token === this.$cookie.get('adminCookie') && inloggad.type === 'admin' ) {
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
/* .table th {
  background-color: #F5F5F5;
} */
h3  {
  width: 80%;
  margin: auto;
  padding: 20px
}
table {
  font-family: 'Work Sans', sans-serif;
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
