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
              body: JSON.stringify({available:'hallå', returnDate:'hej', ID:'ha'}),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          })
          .then(response => response.json())
          .then(result => {
          console.log(result)
          })
      }
  }
}
</script>

<style scoped>
button{
font-size:15px;
background-color: #F3C954;
border: 2px solid transparent;
padding: 10px 40px;
border-radius: 2px;
}

button:hover {
  border: 2px solid grey;
}
</style>
