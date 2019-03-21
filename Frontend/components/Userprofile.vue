<template>
  <div id="profilepagemain" v-if="inloggad">
  <h1>Hej {{ this.name }}!</h1>

  <div id="profilepageuserinfo">
    Namn Namn | <a href="">mail@mail.mail</a> | Adress
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
        name: 'Test',
        users: null,
        books: null,
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
