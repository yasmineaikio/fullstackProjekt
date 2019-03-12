<template>
<div>
    <counter-button />
    <search-field></search-field>
    <add-book></add-book>
    <user-profile></user-profile>

  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'
    import Userprofile from './Userprofile.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'search-field': Search,
      'add-book': AddBook,
      'user-profile': Userprofile,
    }
  }
</script>

<style>

</style>
