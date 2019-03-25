<template>
  <div id="profilepagemain" v-if="inloggad">
  <h2>Hej {{ name }}!</h2>

  <div id="profilepageuserinfo" class="container">
    Namn Namn | <a href="">mail@mail.mail</a> | Adress
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

<p>Alla användare i databasen:</p>
<ul v-for="user in users">
  <li>{{ user }}</li>
</ul>


  </div>
</template>

<script>

  export default {
  created() {
    this.fetchresult()
  },
    data() {
      return {
        name: 'Test',
        users: null,
        books: null,
        loans: null,
        inloggad: true,
      }
    },
    methods: {
      fetchresult() {
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then (result => {
            this.users = result
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
