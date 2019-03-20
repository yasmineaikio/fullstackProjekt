<template>
  <div class="container">
  <add-book></add-book>
  <search-field></search-field>
  <h3>Böcker</h3>
  <table>
  <tr>
    <th>Titel</th>
    <th>Författare</th>
    <th>Kategori</th>
    <th>Utgivningår</th>
    <th>Språk</th>
  </tr>
  <tr>
    <td>HÄMTA</td>
    <td>HÄMTA</td>
    <td>HÄMTA</td>
    <td>HÄMTA</td>
    <td>HÄMTA</td>
  </tr>
  </table>
  </div>
</template>
<script>
  import Search from './search.vue'
  import AddBook from './addBook.vue'
  export default {
    data() {
      return {
        titel: '',
        author: '',
        category: '',
        year: '',
        language: '',
      }
    },
        methods: {
          getBooks(){
            fetch('http://localhost:3000/books')
            .then(function(response) {
              return response.json()
            })
            .then(function(result){
              console.log(result)
        })
      }
    },
    components: {
      'search-field': Search,
      'add-book': AddBook,
    }

  }
</script>


<style scoped>
.container {
 margin: 2em;
}

h3 {
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
