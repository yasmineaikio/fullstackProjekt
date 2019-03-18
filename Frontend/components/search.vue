<template>
  <div id="search">

    <div class="search-input">
      <input type="text" placeholder="Tove Jansson" v-model="searchText" v-on:keyup.enter="searchBooks">
      <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/>
    </div>

    <div class="search-result" v-if="result">
      <p>Visar resultat för "{{ searchText }}" </p>
      <li v-for="book in books">
        {{book.title}}
        {{book.author}}
        {{book.category}}
        {{book.year}}
        {{book.language}}
      </li>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText: '',
        result: false,
        books: []
      }
    },
    methods: {
      searchBooks(){
        this.result = true;
        let word = this.searchText
        fetch('http://localhost:3000/books/' + word)
        .then (response => response.json())
        .then (result => {
          let allBooks = result
          this.books = allBooks
          console.log(allBooks)
        })
      }
    }
  }
</script>
<style scoped>
  #search {
  }
  .search-input {
    padding: 20px;
    width: 100%;
  }
  input {
    width: 60%;
    height: 30px;
    /* display: inline; */
  }
  #search-icon {
    width: 5%;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
    position: relative;
    top: 7px;
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
