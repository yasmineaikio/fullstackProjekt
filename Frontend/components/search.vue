<template>
  <div id="search">
    <div class="search-input">
      <input type="text" placeholder="Tove Jansson" v-model="searchText">
      <input type="button" value="Sök" v-on:click="searchBooks">
    </div>

    <div class="search-result" v-if="result">
      <p>Visar resultat för "{{ searchText }}" </p>
      <!-- <li v-for="book in books"> {{ book }}</li> -->
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText: '',
        result: false,
        books: ['Bok1', 'Bok2']
      }
    },
    methods: {
      searchBooks(){
        this.books = [{
          title: 'Ett',
          author: 'Marua'
        }, {
          title: 'Två'
        }]
        console.log(this.books);
        this.result = true;
        let word = this.searchText
        console.log(word);
        console.log('http://localhost:3000/books/' + word)
        fetch('http://localhost:3000/books/')
        .then (function(response){
          return response.json()
        })
        .then (function(result){
          //console.log(result)
          let allBooks = result
          console.log(allBooks)
          //console.log(allBooks[2].author);


        })
      }
    }
  }
</script>
<style scoped>
  #search {
    width: 50%
  }
  input {
    width: 100%;
    height: 30px;
  }
  .search-input {
    padding: 20px;
  }
  .search-result {
    padding: 20px;
  }
  .search-result li {
    list-style: none;
    border: solid black 1px;
    padding: 40px;
    margin: 40px;
    width: 50%;
  }

</style>
