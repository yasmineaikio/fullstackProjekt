<template>
  <input v-bind:value="updateUser" v-on:click="updateUserFunc" class="button">
</template>

<script>
  export default {
    // props: ['currency', 'includesVat', 'name', 'price', 'productId'],  // props: kommunikation från förälderkomponenter eller Vue-instansen, till barnkomponenter (modul 8)
    data() {
      return {
        updateUser: 'Ändra uppgifter',
        anvandare: null,
      }
    },
    methods: {
      // alertFunction() {
      // let newRealname = prompt('Ändra realname')
      //   // this.updateUser = 'Du har klickat på knappen'
      //   alert(newRealname)
      // }

        updateUserFunc() {
          // // testar bara: funkar att lägga till en ny användare med uppgifter som ändras i koden (dvs. ej användbart)
          // fetch('http://localhost:3000/users', {
          //     body: JSON.stringify({name: 'NewTest', password: 'Testaar', type: 'user', email: 'testar@test.test', realname: 'fsadfsd', address: 'Testar'}),
          //     headers: {
          //       'Content-Type': 'application/json'
          //     },
          //     method: 'POST'
          //   })
          //    .then(function (response) {
          //     return response.json()
          //   })
          //    .then(function (result) {
          //     console.log(result)
          //   })

            // // testar bara: för att hämta alla användare - funkar
            fetch('http://localhost:3000/users')
              .then(function (response) {
                return response.json()
              })
              .then(function (result) {
                let anvandare = result
                console.log(anvandare)
              })

            // för att ändra en användares uppgifter:
            // fetch('http://localhost:3000/users', {
            //     body: JSON.stringify({name: 'Testar2', password: 'Testar', type: 'user', email: 'testar@test.test', realname: 'fsadfsd', address: 'Testar'}),
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     method: 'PUT'
            //   })
            //    .then(function (response) {
            //     return response.json()
            //   })
            //    .then(function (result) {
            //     alert(result)
            //   })

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
