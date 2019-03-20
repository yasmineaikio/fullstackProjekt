<template>
<div>
<form>
    <input v-model="title" placeholder="Titel">
    <input v-model="author" placeholder="Författare">
    <input v-model="category" placeholder="Kategori">
    <input v-model="year" placeholder="Utgivningsår">
    <input v-model="language" placeholder="Språk">
    <input v-on:click="addBook" type="submit" value="Lägg till">
  </form>
  <p v-if="message">Du har lagt till {{ addedTitle }}</p>
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
          available: null,
          returndate: null,
          id: null,
          message: false,
          addedTitle: null,
      }
    },
  methods: {
      addBook() {
          fetch('http://localhost:3000/books', {
              body: '{ "title": "' + this.title + '", "author": "' + this.author +'", "category": "' + this.category + '", "year": "' + this.year + '","language": "' + this.language + '" }',
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          })
          .then(response => response.json())
          .then(result => {
            this.addedTitle = this.title
            this.title = null
            this.author = null
            this.category = null
            this.language = null
            this.message = true
            this.books = result
          })
      }
  }
}

</script>

<style scoped>
</style>