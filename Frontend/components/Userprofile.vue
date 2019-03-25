<template>
  <div id="profilepagemain" v-if="this.$cookie.get('Cookie')">
  <h1>Hej {{ this.name }}!</h1>


  <div id="profilepageuserinfo">
  <h3>Kontaktinformation</h3>
   {{ this.realname }} | <a v-bind:href="emaillink">{{ this.email }}</a> | {{ this.address }}
  </div>

  <div id="profilepagebooks" class="container">
    <h3>Lånade böcker</h3>

    <table id="booktable">
      <tr>
        <th>ID</th>
        <th>Titel</th>
        <th>Författare</th>
        <th>Lånedatum</th>
        <th>Återlämningsdatum</th>
      </tr>
      <tr v-for="loan in loans">
        <td>{{ loan.ID }}</td>
        <td>{{ loan.title }}</td>
        <td>{{ loan.author }}</td>
        <td>{{ loan.date }}</td>
        <td>{{ loan.due }}</td>
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

  export default {
  created() {
    this.fetchresult()
  },
    data() {
      return {
        name: '',
        users: null,
        books: null,
        loans: null,
        realname: '',
        address: '',
        inloggad: true,
        emaillink: 'mailto:' + this.email,
      }
    },
    methods: {
      fetchresult() {
        fetch('http://localhost:3000/login')
        .then(response => response.json())
          .then (result => {
            //Hämtar namnet på usern som är inloggad utifrån userns cookie (Alex)
            this.name = result.find(value => value.token === this.$cookie.get('Cookie')).user
          })

          fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then (result => {
              this.realname = result.find(value => value.name === this.name ).realname
              this.email = result.find(value => value.name === this.name ).email
              this.address = result.find(value => value.name === this.name ).address

            })


        fetch('http://localhost:3000/books')
          .then(response => response.json())
          .then (result => {
            this.books = result
          })

        fetch('http://localhost:3000/loans')
          .then(response => response.json())
          .then (result => {
            this.loans = result
          })
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
