<template>
  <div id="search">

    <div class="search-input">
      <input type="text" placeholder="Tove Jansson" id="search-textfield" v-model="searchText" v-on:keyup.enter="searchBooks">
      <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/>

      <p id="advanced-search" v-on:click="showAdvanced">Avancerad sökning
      <font-awesome-icon icon="angle-down"/></p>
      <div v-show="advanced">
        <div class="">
          <h2>Kategori</h2>
            <input type="checkbox" name="" value="">Fiktion
            <input type="checkbox" name="" value="">Fakta
            <input type="checkbox" name="" value="">Ungdom
            <input type="checkbox" name="" value="">Barn
        </div>
        <div class="">
          <h2>Språk</h2>
            <input type="checkbox" name="" value="">Svenska
            <input type="checkbox" name="" value="">Engelska
            <input type="checkbox" name="" value="">Finska
        </div>
      </div>

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
        advanced: false,
        counter: 0,
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
      },
      isEven(value){
        if (value%2 == 0){
          return true;
        }
        else {
          return false;
        }
      },
      showAdvanced (){
        this.counter = this.counter +1
        console.log(this.counter);
        if (this.isEven(this.counter) ){
          this.advanced = false;
        }
        else {
          this.advanced = true;
        }
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
  #search-textfield {
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
  #advanced-search {
    cursor: pointer;
  }
  h2 {
    font-size: 18px;
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
