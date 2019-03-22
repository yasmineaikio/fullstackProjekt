<template>
  <div id="profilepagemain" v-if="this.$cookie.get('Cookie')">
  <h1>Hej {{ this.name }}!</h1>

  <div id="profilepageuserinfo">
   {{ this.name }} | <a href="">mail@mail.mail</a> | Adress
  </div>

  <div id="profilepagebooks">
    <h2>Lånade böcker</h2>

    <table id="booktable" v-for="book in books">
      <tr>
        <th>Titel</th>
        <th>Författare</th>
        <th>Lånedatum</th>
        <th>Återlämningsdatum</th>
      </tr>
      <tr>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <td>HÄMTA</td>
        <td>HÄMTA</td>
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
        name: '',
        users: null,
        books: null,
        inloggad: true,
      }
    },
    methods: {
      //Tips till MAJA! fetch users och sen users.find(value => value.name === this.name)
      fetchresult() {
        fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then (result => {
            this.users = result
          })

        fetch('http://localhost:3000/login')
        .then(response => response.json())
          .then (result => {
            //Hämtar namnet på usern som är inloggad utifrån userns cookie (Alex)
            this.name = result.find(value => value.token === this.$cookie.get('Cookie')).user
          })  

        fetch('http://localhost:3000/books')
          .then(response => response.json())
          .then (result => {
            this.books = result
          })

        }
    }
  }

</script>


<style scoped>
#profilepagemain {
width:80%;
margin:auto;
}

#profilepageuserinfo {
margin:4px;
}

#profilepagebooks {
background-color:lightsalmon;
padding:0 4px 4px 4px;
}

#booktable {
border:1px solid #000;
width: 80%;
margin:auto;
}

</style>
