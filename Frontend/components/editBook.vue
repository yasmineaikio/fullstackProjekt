<template>
<div>
    <table>
  <tr>
    <th>Bokomslag</th>
    <th>Titel</th>
    <th>Författare</th>
    <th>Kategori</th>
    <th>Utgivningår</th>
    <th>Språk</th>
    <th>Ändra</th>
  </tr>

  <tr v-for='book in books' v-bind:key="book">
    <td><img v-bind:src="book.image"/></td>
    <td>{{book.title}}</td>
    <td>{{book.author}}</td>
    <td>{{book.category}}</td>
    <td>{{book.year}}</td>
    <td>{{book.language}}</td>
    <input class="button" type="submit" value="Ändra">
  </tr>
  </table>
<!--     <form>
    <div class="field">
      <div class="control">
        <input class="button" type="submit" value="Ändra">
      </div>
    </div>
  </form> -->
  </div>
</template>

<script>
export default {
  data() {
      return {
        title: null,
        author: null,
        category: null,
        year: null,
        language: null,
        books: [],
        id: null,
      }
    },
    created() {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(result => {
        this.books = result
    })
  },
  methods: {  
      getBooks() {
        fetch('http://localhost:3000/books')
        .then(function(response) {
          return response.json()
        })
      }
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
