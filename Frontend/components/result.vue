<template lang="html">
  <div class="container">
    <p v-if="this.books.length == 0">Ingen träff för "{{ searchText }}"
      <span v-if="pickedCat && pickedLang"> i kategorin "{{pickedCat}}" på "{{pickedLang}}"</span>
      <span v-if="pickedCat && !pickedLang"> i kategorin "{{pickedCat}}"</span>
      <span v-if="pickedLang && !pickedCat"> på "{{pickedLang}}"</span>
    </p>
    <p v-else>Visar resultat för "{{ searchText }}"
      <span v-if="pickedCat && pickedLang"> i kategorin "{{pickedCat}}" på "{{pickedLang}}"</span>
      <span v-if="pickedCat && !pickedLang"> i kategorin "{{pickedCat}}"</span>
      <span v-if="pickedLang && !pickedCat"> på "{{pickedLang}}"</span>
    </p>
    <div class="table_wrap">
    <table class="table is-hoverable">
      <thead>
      <tr>
        <th>Bokomslag</th>
        <th>Titel</th>
        <th>Författare</th>
        <th>Kategori</th>
        <th>Utgivningsår</th>
        <th>Språk</th>
        <th>Låna</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book in books">
        <td><img v-bind:src="book.image"/></td>
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.category}}</td>
        <td>{{book.year}}</td>
        <td>{{book.language}}</td>
        <td><loan-button
          v-bind:book-id="book.id"
          ></loan-button></td>
      </tr>
    </tbody>
    </table>
  </div>
</div>
</template>

<script>
import LoanButton from './loanButton.vue'
import EventBus from '../eventbus'

export default {
  components: {
    'loan-button': LoanButton
  },
  created(){
    EventBus.$on('result', this.onResult)
  },
  data() {
    return {
      books: [],
      searchText: '',
      pickedCat: '',
      pickedLang: '',
    }
  },
  methods: {
    onResult(object){
      this.books = object.books
      this.searchText = object.word
      this.pickedCat = object.cat
      this.pickedLang = object.lang
    }
  },
}
</script>

<style scoped>
  /* table {
    border-collapse: collapse;
    width: 80%;
    margin: auto;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  } */

</style>
