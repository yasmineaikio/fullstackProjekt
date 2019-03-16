<template>
<div>
  <header>
    <a id="homelink"><router-link to="/">Startsida</router-link></a>
    <ul>
      <li><router-link to="/books">Böcker</router-link></li>
      <li><router-link to="/profil">Mina sidor</router-link></li>
      <li><router-link to="/users">skapa konto</router-link></li>
      <li><router-link to="/login">Logga in</router-link></li>
    </ul>
  </header>
  <router-view></router-view>
</div>
</template>

<script>
    import router from '../router';
    import Users from './users.vue'
    import Login from './login.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'
    import Userprofile from './Userprofile.vue'
    import GetBooks from './GetBooks.vue'

  export default {
    components: {
      'search-field': Search,
      'add-book': AddBook,
      'user-profile': Userprofile,
      'users': Users,
      'get-books': GetBooks,
      'login': Login,
    },
    router,
  }
</script>

<style>
#homelink a {
  text-decoration: none;
  color:#666;
  padding: 10px 20px;
  margin-top: 3em;
  font: 1.6em cursive;
}
#homelink:active {
  color: #fff;
}
ul {
  list-style: none;
  margin: 2em;
  float: right;
}
li { 
  display: inline;;
  padding: 1px;
}
li a {
  text-decoration: none;
  color:#fff;
  padding: 10px 20px;
  background: #666;

}
</style>
