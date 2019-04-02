<template>
  <div class="container search">
    <div class="search-input" v-on:keyup.enter="searchBooks">
      <div id="search">
        <input type="text" placeholder="Sök titel eller författare" id="search-textfield" v-model="searchText" >
        <font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/>
        <!-- <router-link to="/result"><font-awesome-icon icon="search" id="search-icon" v-on:click="searchBooks"/></router-link> -->
      </div>
      <div class="container advanced">
      <p id="advanced-search" v-on:click="showAdvanced">Avancerad sökning
        <span v-if="!advanced"><font-awesome-icon icon="angle-down"/></span>
        <span v-else><font-awesome-icon icon="angle-up"/></span>
      </p>
      <div v-show="advanced">
        <div>
          <h4>Kategori</h4>
            <ul>
              <li v-for="cat in cats">
                <input type="radio" v-bind:value="cat" v-model="pickedCat">
                {{cat}}
              </li>
            </ul>
        </div>
        <div>
          <h4>Språk</h4>
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
  import router from "../router"
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
        advanced: true,
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
        router.push("/result")
      },
    }
  }
</script>

<style scoped>
  .search-input {
    padding-top: 50px;
  }
  #search-textfield {
    width: 98%;
    height: 30px;
    padding: 6px;
    font-family: 'Work sans', sans-serif;
    background: 0;
    border: 0;
    border-bottom: 2px solid white;
    color: white;
    font-size: 1em;
  }
  #search {
    position: relative;
  }
  #search-icon {
    width: 28px;
    /*  gör breakpoint för mobil */
    height: 28px;
    /* font-size: 16px; */
    cursor: pointer;
    position: absolute;
    top: -6px;
    left: 93%;
    color: #F3C954;
  }
  #advanced-search {
    cursor: pointer;
  }

  .advanced * {
    padding-top: 5px;
    color: white;
    font-family: 'Work Sans', sans-serif;
  }
  .advanced ul {
    float: none;
    padding-left: 0;
    padding-bottom: 0;
  }
  .advanced li {
    list-style: none;
    display: inline;
    text-transform: capitalize;
  }

  @media (max-width: 600px) {
          #search-icon {
          width: 18px;
          top: -1px;
      }
  }

</style>
