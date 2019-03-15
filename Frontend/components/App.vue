<template>
<div>
    <counter-button/>
    <search-field></search-field>
    <add-book></add-book>
    <user-profile></user-profile>
    <users/>
    <get-books></get-books>
  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'
    import Users from './users.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'
    import Userprofile from './Userprofile.vue'
    import GetBooks from './GetBooks.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'search-field': Search,
      'add-book': AddBook,
      'user-profile': Userprofile,
      'users': Users,
      'get-books': GetBooks,

    }
  }
</script>

<style>

</style>
