<template>
  <div class="container is-fluid" v-if="this.$cookie.get('Cookie')">
  <div class="container is-fluid">
  <h2>Hej {{ this.name }}!</h2>
  </div>

  <div class="container is-fluid">
  <h3>Kontaktinformation</h3>
   {{ this.realname }} | <a v-bind:href="emaillink">{{ this.email }}</a> | {{ this.address }}
   <button class="button" style="float:right; margin:0 5px;" @click="removeAccountWarning()">Radera konto</button>
  </div>

  <div class="container is-fluid">
  <h3>Ändra uppgifter</h3>
  <input v-model="name2" type="text" placeholder="Användarnamn">
  <input v-model="password" type="text" placeholder="Lösenord">
  <input v-model="email" type="text" placeholder="E-mail">
  <input v-model="realname" type="text" placeholder="Hela namn">
  <input v-model="address" type="text" placeholder="Adress">

  <input v-bind:value="updateUser" v-on:click="updateUserFunc" class="button" type="submit" >
  </div>

  <div class="container is-fluid">
    <h3>Lånade böcker</h3>

    <table>
      <tr>
        <th>Titel</th>
        <th>Författare</th>
        <th>Lånedatum</th>
        <th>Utgångsdatum</th>
        <th>Dagar kvar</th>
      </tr>
      <tr v-for="loan in loans">
        <td>{{ loan.title }}</td>
        <td>{{ loan.author }}</td>
        <td>{{ loan.loanDate }}</td>
        <td>{{ loan.returnDate }}</td>
        <td @click="countDown(loan.returnDate)">{{count}}</td>
        <td><extend-button
          v-bind:book-id="loan.bookId"
          v-bind:user-id="loan.userId"
          v-on:added-to-loans="getUpdatedLoans"
          ></extend-button></td>
      </tr>
    </table>
  </div>

  </div>
</template>

<script>
  import UpdateUserButton from './updateUserButton.vue'
  import ExtendButton from './extendButton.vue'
  import router from "../router"
  import moment from 'moment'
  import { Dialog } from 'buefy/dist/components/dialog'

  export default {
  created() {
    this.fetchresult()
  },
    data() {
      return {
        updateUser: 'Ändra uppgifter',
        name: '',
        name2: '',
        password: '',
        email: '',
        realname: '',
        address: '',
        inloggad: true,
        userId: '',
        users: [],
        loans: [],
        count: '',
      }
    },
    components: {
      'update-user-button': UpdateUserButton,
      'extend-button': ExtendButton,
    },
    methods: {
      getUpdatedLoans(loans){
        //tar emot om något lån har förlängts (Sara)
        this.loans = loans
      },
      // skapa nedräkningsfunktion, Yasmine. nedräkning funkar, hämtar ej
      countDown(a)  {
        fetch('http://localhost:3000/loans/')
          .then(response => response.json())
          .then (result => {
            let todaysDate = moment().format('YYYY/MM/DD')
            this.count = moment(a, 'YYYY/MM/DD').diff(todaysDate, 'days')
          })
        },
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
                })
            })
        },
        // Låter user ta bort sitt konto. Får en varning först (Alex)
        removeAccountWarning() {
          this.$dialog.confirm({
                title:  'Ta bort kontot',
                message: 'Är du säker att du vill <b>ta bort</b> ditt konto? Du kan inte ångra detta.',
                confirmText: 'Ta bort',
                type: 'is-danger',
                hasIcon: true,
                onConfirm: () => {
                    this.removeAccount()
                    this.$toast.open('Ditt konto har tagits bort!')
                    }
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
                      router.push("/")
                  })
                }else {
                  Dialog.alert('Något har gått fel, försök igen senare!')
                }
            })
            .then(function(result){
                console.log(result)
            })
            this.$cookie.delete('Cookie')
        },
        updateUserFunc() {
            // för att ändra den inloggade användares uppgifter (Maija):
            console.log(this.name)
            fetch('http://localhost:3000/users', {
                body: JSON.stringify( { oldname: this.name, newname: this.name2, password: this.password, email: this.email, realname: this.realname, address: this.address} ),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'PUT'
              })
              .then(response => response.json())
              .then (result => {
                console.log(result)
                // fetch('http://localhost:3000/users/' + this.name2)
                //   .then(response => response.json())
                //   .then (result => {
                //       console.log(result)    // ??????????
                //     })
              })
            }
    }
  }
</script>


<style scoped>
/* #booktable {
  margin:auto;
  border-collapse: collapse;
  font-family: arial, sans-serif;
  overflow-x: scroll;
  width:80%;
} */

</style>
