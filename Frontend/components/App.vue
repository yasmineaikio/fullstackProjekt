<template>
<div>
    <counter-button />
    <search-field></search-field>
    <user-profile></user-profile>

  </div>
</template>

<script>
    import CounterButton from './CounterButton.vue'
    import Search from './search.vue'
    import Userprofile from './Userprofile.vue'

  export default {
    components: {
      'counter-button': CounterButton,
      'search-field': Search,
      'user-profile': Userprofile,
    }
  }
</script>

<style>

</style>
