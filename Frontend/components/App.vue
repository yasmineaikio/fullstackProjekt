<template>
<div>
    <search-field></search-field>
    <add-book></add-book>
    <user-profile></user-profile>
    <users/>
    <login/>
  </div>
</template>

<script>
    import Users from './users.vue'
    import Login from './login.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'
    import Userprofile from './Userprofile.vue'

  export default {
    components: {
      'search-field': Search,
      'add-book': AddBook,
      'user-profile': Userprofile,
      'users': Users,
      'login': Login,
    }
  }
</script>

<style>

</style>
