<template>
  <input v-bind:value="updateUser" v-on:click="updateUser" class="button">
</template>

<script>
  export default {
    // props: ['currency', 'includesVat', 'name', 'price', 'productId'],  // props: kommunikation från förälderkomponenter eller Vue-instansen, till barnkomponenter (modul 8)
    data() {
      return {
        updateUser: 'Ändra uppgifter',
      }
    },
    methods: {
      // alertFunction() {
      // let newRealname = prompt('Ändra realname')
      //   // this.updateUser = 'Du har klickat på knappen'
      //   alert(newRealname)
      // }

        updateUser() {
          // testar bara: funkar att lägga till en ny användare
          fetch('http://localhost:3000/users', {
              body: JSON.stringify({name: 'Testar2', password: 'Testar', type: 'user', email: 'testar@test.test', realname: 'fsadfsd', address: 'Testar'}),
              headers: {'Content-type': 'application/json'},
              method: 'POST'
            })
             .then(function (response) {
              return response.json()
            })
             .then(function (result) {
              console.log(result)
            })

            fetch('http://localhost:3000/users', {
                body: JSON.stringify({name: 'Testar2', password: 'Testar', type: 'user', email: 'testar@test.test', realname: 'fsadfsd', address: 'Testar'}),
                headers: {'Content-type': 'application/json'},
                method: 'PUT'
              })
               .then(function (response) {
                return response.json()
              })
               .then(function (result) {
                alert(result)
              })
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
