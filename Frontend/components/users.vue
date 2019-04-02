<template>
  <div>
      <form @submit.prevent="addUser()">
          <h4>Skapa konto</h4>
          <input type="text" placeholder="Användernamn" v-model="name" required><br>
          <input type="password" placeholder="Lösenord" v-model="password" required><br>
          <input type="text" placeholder="För-och efternamn" v-model="userName" required><br>
          <input type="text" placeholder="Address" v-model="address" required><br>
          <input type="email" placeholder="e-postadress" v-model="email" required><br>
          <button type="submit">Skapa</button>
      </form>
  </div>
</template>
<script>
import router from "../router" 
export default {
    data() {
      return {
          name: '',
          password: '',
          email: '',
          id: null,
          type: 'user',
          userName: '',
          address: '',
      }
    },
    methods: {
        addUser() { 
            var newUser = {'name': this.name, 'password': this.password, "id": this.id, "type": this.type,'email': this.email, 'userName': this.userName, 'address': this.address}
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {'Content-type': 'application/json'},
            }).then(response => {
                router.push('/login')
            })
            .then(result => {
                console.log(result)
            })
            .catch(e => {
                console.log(e);  
            })
        }
    }
}
</script>
<style scoped>
 h4 {
     color:#666;
     font-family: cursive;
     font-weight: 900;
     font-size: 1.5em;
     text-align: center;
     margin: 0;
 }
 form {
     border-radius: 5px;
     background-color: #f2f2f2;
     padding: 20px;
     margin: 2em auto;
     width: 50%;
 }
 input[type=text],input[type=password], input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button[type=submit] {
    width: 100%;
    background-color: #666;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 900;
    text-transform: uppercase;
}

input[type=submit]:hover {
    background-color: #000;
}


@media (max-width: 768px) {
    form {
        width: 100%;
    }
}


</style>