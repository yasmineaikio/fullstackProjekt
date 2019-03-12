<template>
  <div>
    <input type="text" placeholder="Tove Jansson" v-model="searchText">
    <input type="button" value="Sök" v-on:click="onClick">
    <p>Resultat för {{ searchText }} </p>

    <div>
    </div>

  </div>
</template>
<script>

  export default {
    data() {
      return {

      }
    },
    methods: {
      onClick(){

      }
    }
  }
</script>
<style scoped>

</style>
