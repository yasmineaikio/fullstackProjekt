<template>
<div>
    <counter-button />
    <search-field></search-field>
    <add-book></add-book>
  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'search-field': Search,
      'add-book': AddBook,
    }
  }
</script>

<style>

</style>
