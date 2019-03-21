<template>
<div>
<form>
    <input v-model="title" placeholder="Titel">
    <input v-model="author" placeholder="Författare">
    <input v-model="category" placeholder="Kategori">
    <input v-model="year" placeholder="Utgivningsår">
    <input v-model="language" placeholder="Språk">
    <input v-model="image" placeholder="Bild">
    <input v-model="amount" placeholder="Antal">
    <input v-on:click="addBook" type="submit" value="Lägg till">
  </form>
  <p id="addedText" v-if="message"><font-awesome-icon icon="check" id="check"/> Du har lagt till <span id="addedTitle">{{ addedTitle }}</span></p>
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
          id: null,
          image: null,
          amount: null,
          message: false,
          addedTitle: null,
      }
    },
  methods: {
      addBook() {
          fetch('http://localhost:3000/books', {
              body: '{ "title": "' + this.title + '", "author": "' + this.author +'", "category": "' 
              + this.category + '", "year": "' + this.year + '","language": "' + this.language + '", "id": "' 
              + this.id + '", "image": "' + this.image + '", "amount": "' + this.amount + '" }',
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
            this.year = null
            this.language = null
            this.image = null
            this.amount = null
            this.message = true
            this.books = result
          })
      }
  }
}

</script>

<style scoped>

#addedTitle {
  font-weight: bold;
}

#addedText {
  animation-name: fadeIn;
  animation-duration: 1.5s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

#check {
  color: green;
}

</style>