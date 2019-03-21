<template>
<div>
  <form>
    <button v-on:click="addLoan" type="submit">Låna</button>
  </form>
</div>
</template>

<script>
export default {
  data() {
      return {
          available: null,
          returnDate: null,
          ID: null
      }
    },
  methods: {
      addLoan() {
          fetch('http://localhost:3000/loans', {
              body: '{"available":"hallå", "returnDate":"hej", "ID":"jaha"}',
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          })
          .then(response => response.json())
          .then(result => {
          console.log('tillagt')
          })
      }
  }
}
</script>

<style scoped>
</style>
