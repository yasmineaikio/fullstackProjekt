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
    <td>
      <img v-bind:src="book.image"/>
      </td>
    <td>
      <span v-if="click" v-on:click="editable">{{ book.title }}</span>
      <input v-if="!click" type="text" v-model="book.title">
    </td>
    <td>
      <span v-if="click" v-on:click="editable">{{ book.author }}</span>
      <input v-if="!click" type="text" v-model="book.author">
      </td>
    <td>
      <span v-if="click" v-on:click="editable">{{ book.category }}</span>
      <input v-if="!click" type="text" v-model="book.category">
    </td>
    <td>
      <span v-if="click" v-on:click="editable">{{ book.year }}</span>
      <input v-if="!click" type="text" v-model="book.year">
    </td>
    <td>
      <span v-if="click">{{ book.language }}</span>
      <input v-if="!click" type="text" v-model="book.language">
    </td>
    <td>
      <input type="submit" value="Redigera" v-if="click" v-on:click="editable">
      <input v-if="!click" v-on:click="editBook(book.id, book.title, book.author, book.category, book.year, book.language)" 
        type="submit" value="Spara">
      <input v-if="!click" v-on:click="click=true"
        type="submit" value="Avbryt">
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
        books: [],
        click: true
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
    editBook(id, title, author, category, year, language){
      console.log(id, title, author, category, year, language)
      this.click = true

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
