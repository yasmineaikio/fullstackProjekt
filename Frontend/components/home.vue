<template>
<div>
  <a><router-link to="/home">Hem</router-link></a>
  <ul>
    <li><router-link to="/users">skapa konto</router-link></li>
    <li><router-link to="/login">Logga in</router-link></li>
    <li><router-link to="/books">Böcker</router-link></li>
  </ul>
  <search-field></search-field>
  <add-book></add-book>
  <user-profile></user-profile>
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

</style>
