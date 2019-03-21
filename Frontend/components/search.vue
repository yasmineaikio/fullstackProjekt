<template>
  <div class="search">

    <div class="search-input">
      <input type="text" placeholder="Sök titel eller författare" id="search-textfield" v-model="searchText" v-on:keyup.enter="searchBooks">
      <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/>

      <p id="advanced-search" v-on:click="showAdvanced">Avancerad sökning
        <span v-if="!advanced"><font-awesome-icon icon="angle-down"/></span>
        <span v-else><font-awesome-icon icon="angle-up"/></span>
      </p>

      <div class="advanced" v-show="advanced">
        <div >
          <h2>Kategori</h2>
            <ul>
              <li v-for="cat in cats">
                <input type="radio" v-bind:value="cat" v-model="pickedCat">
                {{cat}}
              </li>
            </ul>
        </div>
        <div>
          <h2>Språk</h2>
            <ul>
              <li v-for="lang in langs">
                <input type="radio" v-bind:value="lang" v-model="pickedLang">
                {{lang}}
              </li>
            </ul>
          </div>
        </div>

      </div>

    <div class="search-result" v-if="result">
      <p v-if="this.books.length == 0">Ingen träff för "{{ searchText }}" <span v-if="pickedCat && pickedLang"> i kategorin "{{pickedCat}}" på "{{pickedLang}}".</span></p>
      <p v-else>Visar resultat för "{{ searchText }}" <span v-if="pickedCat && pickedLang"> i kategorin "{{pickedCat}}" på "{{pickedLang}}".</span> </p>
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
    created(){
        fetch('http://localhost:3000/books/')
        .then (response => response.json())
        .then (result => {
          console.log(result)
          let allCats = []
          let allLangs = []
          for (let i = 0; i < result.length; i++){
            allCats[i] = result[i].category
            allLangs[i] = result[i].language
          }
          let uniqueCats = [...new Set(allCats)]
          let uniqueLangs = [...new Set(allLangs)]
          this.cats = uniqueCats
          this.langs = uniqueLangs
        })
    },
    data() {
      return {
        searchText: '',
        advanced: false,
        counter: 0,
        cats: [],
        langs: [],
        pickedCat: '',
        pickedLang: '',
        result: false,
        books: []
      }
    },
    methods: {
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
          this.pickedCat = ''
          this.pickedLang = ''
        }
        else {
          this.advanced = true;
        }
      },
      searchBooks(){
        this.result = true;
        let word = this.searchText
        let cat = this.pickedCat
        let lang = this.pickedLang
        if (cat === '' && lang === ''){
          fetch('http://localhost:3000/books/' + word)
          .then (response => response.json())
          .then (result => {
            let allBooks = result
            this.books = allBooks
            console.log(allBooks)
          })
        }
        else {
          fetch('http://localhost:3000/books/' + word + '?cat=' + cat + '&lang=' + lang)
          .then (response => response.json())
          .then (result => {
            let allBooks = result
            this.books = allBooks
            console.log(allBooks)
          })
        }
      },
    }
  }
</script>
<style scoped>
  .search {
  }
  .search-input {
    padding: 20px;
    width: 100%;
    background-color: lightgrey;
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
  .advanced ul {
    padding-left: 0;
  }

  .advanced li {
    list-style: none;
    display: inline;
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
