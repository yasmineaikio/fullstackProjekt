<template>
<!--     <input class="addBookTextfields" v-model="title" placeholder="Titel" required><br>
    <input class="addBookTextfields" v-model="author" placeholder="Författare" required><br>
    <input class="addBookTextfields" v-model="category" placeholder="Kategori" required><br>
    <input class="addBookTextfields" v-model="year" placeholder="Utgivningsår" required><br>
    <input class="addBookTextfields" v-model="language" placeholder="Språk" required><br>
    <input class="addBookTextfields" v-model="image" placeholder="Bild" required><br>
    <input class="addBookButton" :disabled="isDisabled" v-on:click="addBook" type="submit" value="Lägg till"><br> -->
    <div class="box">
  <h1 class="title is-4">
    Nya böcker blir tillgängliga för utlåning genom att fylla i nedan formulär.
    </h1>
<form>
    <div class="field">
      <label class="label">Titel</label>
      <div class="control">
        <input v-model="title" class="input" type="text" placeholder="Titel" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Författare</label>
      <div class="control">
        <input v-model="author" class="input" type="text" placeholder="Författare" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Kategori</label>
      <div class="control">
        <input v-model="category" class="input" type="text" placeholder="Kategori" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Utgivningsår</label>
      <div class="control">
        <input v-model="year" class="input" type="number" placeholder="Utgivningsår" required>
      </div>
    </div>

    <div class="field">
      <label class="label">Språk</label>
      <div class="control">
        <input v-model="language" class="input" type="text" placeholder="Språk" required>
      </div>
    </div>
  
    <div class="field">
      <label class="label">Bild</label>
      <div class="control">
        <input v-model="image" class="input" type="text" placeholder="Bild (ange url)" required>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input :disabled="isDisabled" v-on:click="addBook" class="button" type="submit" value="Lägg till">
      </div>
    </div>

  </form>
  <p id="addedText" v-if="message">&#x2714; Du har lagt till:
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
          message: false,
          addedTitle: null
      }
    },
  computed: {
  	  isDisabled() {
    	  return !this.title || !this.author || !this.category || !this.year || !this.language || !this.image
      }
  },

  methods: {
      addBook() {
          fetch('http://localhost:3000/books', {
              body: '{ "title": "' + this.title + '", "author": "' + this.author +'", "category": "' 
              + this.category + '", "year": "' + this.year + '","language": "' + this.language + '", "id": "' 
              + this.id + '", "image": "' + this.image + '" }',
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
            this.message = true
            this.books = result
          })
      }
  }
}

</script>

<style scoped>

.label, .checkbox {
  height: 20px;
  font-family: 'Work Sans', sans-serif;
}

.button {
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
  margin-top: 0.75rem;
}

#check {
  color: green;
}

.title {
  font-family: 'Work Sans', sans-serif;
  margin-bottom: 20px;
}

.input:focus, .taginput .taginput-container.is-focusable:focus, .input.is-focused, .taginput 
.is-focused.taginput-container.is-focusable, .input:active, .taginput .taginput-container.is-focusable:active, 
.input.is-active, .taginput .is-active.taginput-container.is-focusable, .textarea:focus, .textarea.is-focused, 
.textarea:active, .textarea.is-active {
  border-color: #7A7A7A;
}

.button[disabled], fieldset[disabled] {
  background-color: #F3C954;
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