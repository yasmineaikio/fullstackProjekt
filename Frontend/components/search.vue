<template>
  <div id="search">

    <div class="search-input">
      <input type="text" placeholder="Tove Jansson" id="search-textfield" v-model="searchText" v-on:keyup.enter="searchBooks">
      <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/>

      <p id="advanced-search" v-on:click="showAdvanced">Avancerad sökning
      <font-awesome-icon v-if="!advanced" icon="angle-down"/>
      <font-awesome-icon v-if="advanced" icon="angle-up"/></p>
      <div v-show="advanced">
        <div class="">
          <h2>Kategori</h2>
            <input type="radio" value="fiktion" v-model="pickedCat">Fiktion
            <input type="radio" value="fakta" v-model="pickedCat">Fakta
            <input type="radio" value="ungdom" v-model="pickedCat">Ungdom
            <input type="radio" value="barn" v-model="pickedCat">Barn
        </div>
        <div class="">
          <h2>Språk</h2>
            <input type="radio" value="svenska" v-model="pickedLang">Svenska
            <input type="radio" value="engelska" v-model="pickedLang">Engelska
            <input type="radio" value="finska" v-model="pickedLang">Finska
        </div>
        <p>Du har valt {{ pickedCat }}, {{pickedLang}}</p>
        <input type="button" value="Avancerad sökning" v-on:click="advancedSearchBooks">
      </div>

    </div>

    <div class="search-result" v-if="result">
      <p v-if="this.books.length == 0">Ingen träff för "{{ searchText }}" <span v-if="pickedCat && pickedLang"> i kategorin {{pickedCat}} på {{pickedLang}}.</span></p>
      <p v-else>Visar resultat för "{{ searchText }}" <span v-if="pickedCat && pickedLang"> i kategorin {{pickedCat}} på {{pickedLang}}.</span> </p>
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
        pickedCat: '',
        pickedLang: '',
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
      },
      advancedSearchBooks(){
        this.result = true;
        let word = this.searchText
        let cat = this.pickedCat
        let lang = this.pickedLang
        fetch('http://localhost:3000/books/' + word + '?cat=' + cat + '&lang=' + lang)
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
