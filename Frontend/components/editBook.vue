<template>
<div>
    <form>
    <div class="field">
      <div class="control">
        <input class="button" type="submit" value="Ändra">
      </div>
    </div>
  </form>
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
          editable: null,
      }
    },

  methods: {
      editBook() {
          fetch('http://localhost:3000/books', {
              body: '{ "title": "' + this.title + '", "author": "' + this.author +'", "category": "' 
              + this.category + '", "year": "' + this.year + '","language": "' + this.language + '", "id": "' 
              + this.id + '", "image": "' + this.image + '" }',
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'PUT'
          })
          .then(response => response.json())
          .then(result => {
            this.books = result
          })
      }
  }
}
</script>

<style scoped>

</style>
