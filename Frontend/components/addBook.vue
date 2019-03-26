<template>
<div>
  <div id="startText">
    När nya böcker kommit in kan dessa läggas in för utlåning genom att fylla i nedan formulär.
    Samtliga fält är obligatoriska.
  </div>
<form>
    <input class="addBookTextfields" v-model="title" placeholder="Titel" required>
    <input class="addBookTextfields" v-model="author" placeholder="Författare" required>
    <input class="addBookTextfields" v-model="category" placeholder="Kategori" required>
    <input class="addBookTextfields" v-model="year" placeholder="Utgivningsår" required>
    <input class="addBookTextfields" v-model="language" placeholder="Språk" required>
    <input class="addBookTextfields" v-model="image" placeholder="Bild" required>
    <input class="addBookTextfields" v-model="amount" placeholder="Antal" required>
    <input class="addBookButton" :disabled="isDisabled" v-on:click="addBook" type="submit" value="Lägg till">
  </form>
  <p id="addedText" v-if="message"><font-awesome-icon icon="check" id="check"/> Du har lagt till:
  <span id="addedTitle">{{ addedTitle }}</span></p>
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
          addedTitle: null
      }
    },
  computed: {
  	  isDisabled() {
    	  return !this.title || !this.author || !this.category || !this.year || !this.language || !this.image || !this.amount
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

.addBookTextfields {
  height: 20px;
  font-family: 'Work Sans', sans-serif;
}

.addBookButton {
  height: 30px;
  background-color: #F3C954;
  border: none;
  border-radius: 2px;
  font-family: 'Work Sans', sans-serif;
}

#addedTitle {
  font-weight: bold;
  font-family: 'Work Sans', sans-serif;
}

#addedText {
  animation-name: fadeIn;
  animation-duration: 1.5s;
  font-family: 'Work Sans', sans-serif;
}

#check {
  color: green;
}

#startText {
  font-family: 'Work Sans', sans-serif;
  margin-bottom: 20px;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

</style>