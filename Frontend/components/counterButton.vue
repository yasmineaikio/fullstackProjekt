<template>
  <input v-bind:value="counter" v-on:click="onClick" type="button">
</template>
<script>

  export default {
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      onClick() {
        this.counter = this.counter + 1
      }
    }
  }
</script>
<style scoped>
  input {
    width: 100%;
  }
</style>