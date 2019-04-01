<template>
  <div>
  <h1>Ändra uppgifter</h1>
    <input v-model="name" type="text" placeholder="Användarnamn">
    <input v-model="password" type="text" placeholder="Lösenord">
    <input v-model="email" type="text" placeholder="E-mail">
    <input v-model="realname" type="text" placeholder="Namn">
    <input v-model="address" type="text" placeholder="Adress">

  <input v-bind:value="updateUser" v-on:click="updateUserFunc" class="button" type="submit" >
  </div>
</template>

<script>
  export default {
    // props: ['currency', 'includesVat', 'name', 'price', 'productId'],  // props: kommunikation från förälderkomponenter eller Vue-instansen, till barnkomponenter (modul 8)
    data() {
      return {
        updateUser: 'Ändra uppgifter',
        anvandare: null,
        name: null,
        password: null,
        email: null,
        realname: null,
        address: null,
      }
    },
    methods: {
        updateUserFunc() {
            // // för att ändra en användares uppgifter:
            fetch('http://localhost:3000/users', {
                body: JSON.stringify( { name: this.name, password: this.password, email: this.email, realname: this.realname, address: this.address} ),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'PUT'
              })
              .then(response => {

                fetch('http://localhost:3000/users/')
                  .then(response => response.json())
                  .then (result => {
                      console.log(result)
                    })

              })

            // för att ändra en användares uppgifter:
            // fetch('http://localhost:3000/users', {
            //   body: '{ "name": "' + this.name + '", "password": "' + this.password + '", "email": "'
            //   + this.email + '", "realname": "' + this.realname + '","address": "' + this.address + '" }',
            //     headers: {
            //       'Content-Type': 'application/json'
            //     },
            //     method: 'PUT'
            //   })
            //    .then(function (response) {
            //     return response.json()
            //   })
            //    .then(function (result) {
            //     updatedUser = result
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
