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
    <th>Redigera</th>
  </tr>

  <tr v-for='book in books' v-bind:key="book">
    <td><img v-bind:src="book.image"/></td>
    <td>
      <span v-if="click" v-on:click="editable">{{ book.title }}</span>
      <input v-if="!click" type="text" v-model="book.title">
    </td>
    <td>{{book.author}}</td>
    <td>{{book.category}}</td>
    <td>{{book.year}}</td>
    <td>{{book.language}}</td>
    <td>
      <span v-if="click">Klicka på det fält du vill redigera</span>
      <input v-if="!click" v-on:click="editBook(book.title)" type="submit" value="Spara">
    </td>
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
        click: true,
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
    editable(){
      this.click = false
    },
    editBook(title){
      console.log(title)
      this.click = true

      fetch('http://localhost:3000/books/'+ title, {
        body: '{ "title": "' + this.title + '" }',
              headers: {
                  'Content-Type': 'application/json'
              },
        method: 'PUT'
      })
      .then (response => {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(result => {
          this.books = result
        })
      })
    },
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
