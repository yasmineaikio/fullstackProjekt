<template>
  <div class="table_wrap">
    <table class="table is-hoverable">
    <thead>
      <tr>
        <th>Bokomslag</th>
        <th>Titel</th>
        <th>Författare</th>
        <th>Kategori</th>
        <th>Utgivningår</th>
        <th>Språk</th>
        <th>Redigera</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='book in books' v-bind:key="book">
        <td>
          <img v-bind:src="book.image"/>
        </td>
        <td>
          <span v-if="!click">{{ book.title }}</span>
          <input v-if="click" type="text" v-model="book.title">
        </td>
        <td>
          <span v-if="!click">{{ book.author }}</span>
          <input v-if="click" type="text" v-model="book.author">
        </td>
        <td>
          <span v-if="!click">{{ book.category }}</span>
          <input v-if="click" type="text" v-model="book.category">
        </td>
        <td>
          <span v-if="!click">{{ book.year }}</span>
          <input v-if="click" type="text" v-model="book.year">
        </td>
        <td>
          <span v-if="!click">{{ book.language }}</span>
          <input v-if="click" type="text" v-model="book.language">
        </td>
        <td>
          <input  v-if="!click" v-on:click="editable" class="button" type="submit" value="Redigera">
          <input v-if="click" v-on:click="editBook(book.id, book.title, book.author, book.category, book.year, book.language)" 
            class="button" type="submit" value="Spara">
          <input v-if="click" v-on:click="click=false"
            class="button" type="submit" value="Avbryt">
        </td>
      </tr>
    </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
      return {
        books: [],
        click: false
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
      this.click = true
    },
    editBook(id, title, author, category, year, language){
      console.log(id, title, author, category, year, language)
      this.click = false

      fetch('http://localhost:3000/books', {
        body: '{ "title": "' + title + '", "author": "' + author +'", "category": "' 
              + category + '", "year": "' + year + '","language": "' + language + '", "id": "' 
              + id + '" }',
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
          console.log(result)
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
.button {
  margin-bottom: 1em;
}
table {
  font-family: 'Work Sans', sans-serif;
  border-collapse: collapse;
  width: 80%;
  margin: auto;
}
</style>
