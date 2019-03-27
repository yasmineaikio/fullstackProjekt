<template>
  <div class="search">
    <div class="search-input" v-on:keyup.enter="searchBooks">
      <div id="search">
        <input type="text" placeholder="Sök titel eller författare" id="search-textfield" v-model="searchText" >
        <!-- <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/> -->
        <router-link to="/result"><font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/></router-link>
      </div>
      <div class="advanced">
      <p id="advanced-search" v-on:click="showAdvanced">Avancerad sökning
        <span v-if="!advanced"><font-awesome-icon icon="angle-down"/></span>
        <span v-else><font-awesome-icon icon="angle-up"/></span>
      </p>
      <div v-show="advanced">
        <div>
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
    </div>
  </div>
</template>

<script>
  import Result from './result.vue'
  import EventBus from '../eventbus'
  export default {
    components: {
      'result': Result,
    },
    created(){
        fetch('http://localhost:3000/books/catsandlangs')
        .then (response => response.json())
        .then (result => {
          this.cats = result[0]
          this.langs = result[1]
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
        this.advanced = false
        let word = this.searchText
        let cat = this.pickedCat
        let lang = this.pickedLang
        if (cat === '' && lang === ''){
          fetch('http://localhost:3000/books/' + word)
          .then (response => response.json())
          .then (result => {
            let allBooks = result
            EventBus.$emit('result', {books: allBooks, word: this.searchText, cat: this.pickedCat, lang: this.pickedLang})
          })
        }
        else {
          fetch('http://localhost:3000/books/' + word + '?cat=' + cat + '&lang=' + lang)
          .then (response => response.json())
          .then (result => {
            let allBooks = result
            EventBus.$emit('result', {books: allBooks, word: this.searchText, cat: this.pickedCat, lang: this.pickedLang})
          })
        }
      },
    }
  }
</script>

<style scoped>
  .search-input {
    padding: 20px;
    background-color: #7A7A7A;
  }
  #search-textfield {
    width: 98%;
    height: 30px;
    padding: 6px;
    font-family: 'Work sans', sans-serif;
  }
  #search {
    position: relative;
  }
  #search-icon {
    width: 5%;
    height: 30px;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    top: 7px;
    left: 95%;
    color: #F3C954;
  }
  #advanced-search {
    cursor: pointer;
  }
  h2 {
    font-size: 18px;
  }
  .advanced * {
    color: white;
    font-family: 'Work Sans', sans-serif;
  }
  .advanced ul {
    padding-left: 0;
  }
  .advanced li {
    list-style: none;
    display: inline;
  }

</style>
