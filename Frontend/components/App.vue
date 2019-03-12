<template>
<div>
    <counter-button />
    <search-field></search-field>

  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'
    import Search from './search.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'search-field': Search,
    }
  }
</script>

<style>

</style>
