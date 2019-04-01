<template>
  <div class="container is-fluid" v-if="this.$cookie.get('Cookie')">
  <h1>Hej {{ this.name }}!</h1>


  <div class="container is-fluid">
  <h3>Kontaktinformation</h3>
   {{ this.realname }} | <a v-bind:href="emaillink">{{ this.email }}</a> | {{ this.address }}
   <button class="button" style="float:right; margin:0 5px;" @click="removeAccount()">Radera konto</button>
  </div>

  <div>
    <countDown></countDown>

  </div>

  <div id="profilepagebooks" class="container">
    <h3>Lånade böcker</h3>

    <table id="booktable">
      <tr>
        <th>Titel</th>
        <th>Författare</th>
        <th>Lånedatum</th>
        <th>Utgångsdatum</th>
      </tr>
      <tr v-for="loan in loans">
        <td>{{ loan.title }}</td>
        <td>{{ loan.author }}</td>
        <td>{{ loan.loanDate }}</td>
        <td>{{ loan.returnDate }}</td>
      </tr>
    </table>
  </div>

  </div>
</template>

<script>
  import UpdateUserButton from './updateUserButton.vue'
  import router from "../router"

  export default {
  created() {
    this.fetchresult()
  },
    data() {
      return {
        updateUser: 'Ändra uppgifter',
        name: '',
        users: [],
        books: [],
        loans: [],
        realname: '',
        address: '',
        inloggad: true,
        userId: '',
      }
    },
    components: {
      'update-user-button': UpdateUserButton,
    },
    methods: {
      fetchresult() {
        fetch('http://localhost:3000/login')
        .then(response => response.json())
          .then (result => {
            //Hämtar namnet på usern som är inloggad utifrån userns cookie (Alex)
            this.name = result.find(value => value.token === this.$cookie.get('Cookie')).user
          })/*.then(() => {
            this.name...
          })*/

          fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then (result => {
              this.realname = result.find(value => value.name === this.name ).realname
              this.email = result.find(value => value.name === this.name ).email
              this.address = result.find(value => value.name === this.name ).address
              this.userId = result.find(value => value.name === this.name ).id
            }).then(() => {
              //hämtar lån, med viss användare (sara, yasmine)
              fetch('http://localhost:3000/loans/' + this.userId)
                .then(response => response.json())
                .then (result => {
                  this.loans = result
                  console.log(this.loans)
                })
            })

        fetch('http://localhost:3000/books')
          .then(response => response.json())
          .then (result => {
            this.books = result
          })
        },
        removeAccount() {
          // Låter user ta bort sitt konto (Alex)
          let cookie = {'Cookie': this.$cookie.get('Cookie')}
          fetch('http://localhost:3000/users', {
                method: 'DELETE',
                body: JSON.stringify(cookie),
                headers: {'Content-type': 'application/json'},
            }).then(function(response) {
                if (response.status === 200) {
                  fetch('http://localhost:3000/logout', {
                      method: 'POST',
                      body: JSON.stringify(cookie),
                      headers: {'Content-type': 'application/json'},
                  }).then(function(response) {
                      alert("Ditt konto har raderats!")
                      router.push("/")
                  })
                }else {
                  alert('Något har gått fel, försök igen senare!')
                }
            })
            .then(function(result){
                console.log(result)
            })
            this.$cookie.delete('Cookie')
        },
        updateUserFunc() {
            // // för att ändra den inloggade användares uppgifter (Maija):
            fetch('http://localhost:3000/users', {
                body: JSON.stringify( { name: this.name, password: this.password, email: this.email, realname: this.realname, address: this.address} ),
                // body: JSON.stringify( { name: name, password: password, email: email, realname: realname, address: address} ),
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
            }

    }
  }
</script>


<style scoped>
#booktable {
  margin:auto;
  border-collapse: collapse;
  font-family: arial, sans-serif;
  overflow-x: scroll;
  width:80%;
}



</style>
