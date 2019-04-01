<template>
  <div class="container">
  <add-book v-if="admin"></add-book>
  <search-field></search-field>

  <table>
  <tr>
    <!-- <th>Bokomslag</th>
    <th>Titel</th>
    <th>Författare</th>
    <th>Kategori</th>
    <th>Utgivningår</th>
    <th>Språk</th> -->

    <th v-on:click = "sortBooks('title')">Titel</th>
    <th v-on:click = "sortBooks('author')">Författare</th>
    <th v-on:click = "sortBooks('category')">Kategori</th>
    <th v-on:click = "sortBooks('year')">Utgivningår</th>
    <th v-on:click = "sortBooks('language')">Språk</th>
  </tr>
    <th v-if="!admin">Låna</th>
    <th v-if="admin">Ändra</th>
    <th v-if="admin">Ta bort</th>
  </tr>
  <tr v-for='book in books'>
    <td><img v-bind:src="book.image"/></td>
    <td>{{book.title}}</td>
    <td>{{book.author}}</td>
    <td>{{book.category}}</td>
    <td>{{book.year}}</td>
    <td>{{book.language}}</td>
    <td v-if="!admin"><loan-button v-bind:book-id="book.id"></loan-button></td>
    <td v-if="admin"><edit-book></edit-book></td>
    <td v-if="admin">Ta bort-knapp</td>
  </tr>
  </table>
  </div>
</template>
<script>
  import EditBook from './editBookButton.vue'
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
    // sotera böcker (Elin)
    methods: {
      sortBooks(katt) {
        console.log(katt);
      fetch('http://localhost:3000/books/sort/' + katt)
      .then(response => response.json())
      .then(result => {
      this.books = result
    })
    // console.log(Hej);
    }
  },    

    components: {
      'add-book': AddBook,
      'loan-button': LoanButton,
      'edit-book': EditBook,
    },

    // methods: {
    //   getBooks() {
    //     fetch('http://localhost:3000/books')
    //     .then(function(response) {
    //       return response.json()
    //     })
    //     .then(function(result){
    //       console.log(result)
    //     })
    //   }
    // },

   //  created() {
   //      fetch('http://localhost:3000/books')
   //      .then(response => response.json())
   //      .then(result => {
   //      this.books = result
   //  })
   // },

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
