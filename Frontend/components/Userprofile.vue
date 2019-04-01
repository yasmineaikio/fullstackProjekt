<template>
  <div id="profilepagemain" v-if="this.$cookie.get('Cookie')">
  <h1>Hej {{ this.name }}!</h1>


  <div id="profilepageuserinfo">
  <h3>Kontaktinformation</h3>
   {{ this.realname }} | <a v-bind:href="emaillink">{{ this.email }}</a> | {{ this.address }}
   <update-user-button></update-user-button>
   <button class="button" style="float:right; margin:0 5px;" @click="removeAccount()">Radera konto</button>
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
        <td><extend-button
          ></extend-button></td>
      </tr>
    </table>
  </div>


<!--
<p>Alla användare i databasen:</p>
<ul v-for="user in users">
  <li>{{ user }}</li>
</ul>
-->


  </div>
</template>

<script>
  import UpdateUserButton from './updateUserButton.vue'
  import ExtendButton from './extendButton.vue'
  import router from "../router"

  export default {
  created() {
    this.fetchresult()
  },
    data() {
      return {
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
      'extend-button': ExtendButton,
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
        }
    }
  }
</script>


<style scoped>
#profilepagemain {
  font-family: 'Work Sans', sans-serif;
  width:80%;
  margin:auto;
}

#profilepageuserinfo {
}

#profilepagebooks {
  padding:0 4px 4px 4px;
}

#booktable {
  margin:auto;
  border-collapse: collapse;
  font-family: arial, sans-serif;
  overflow-x: scroll;
  width:80%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

</style>
