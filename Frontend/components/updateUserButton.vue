<template>
  <input v-bind:value="updateUser" v-on:click="updateFunction" type="button">
</template>
<script>
  export default {
    data() {
      return {
        updateUser: 'Ändra uppgifter',
      }
    },
    methods: {
      updateFunction() {
        let newRealname = prompt('Ändra realname')
        alert(newRealname)
      }
    }
  }
</script>
<style scoped>
  input {
    float:right;
    margin-right:5%;
  }
</style>
