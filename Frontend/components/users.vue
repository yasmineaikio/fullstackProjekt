<template>
  <div>
      <form @submit.prevent="addUser()">
          <h4>Skapa konto</h4>
          <input type="text" placeholder="Namn" v-model="name"><br>
          <input type="password" placeholder="Lösenord" v-model="password"><br>
          <input type="e-mail" placeholder="e-postadress" v-model="email"><br>
          <button type="submit">Skapa</button>
      </form>
  </div>
</template>
<script>
export default {
    data() {
      return {
          name: '',
          password: '',
          email: '',
          id: null,
          type: 'user'
      }
    },
    methods: {
        addUser() { 
            var newUser = {'name': this.name, 'password': this.password, 'email': this.email, "id": this.id, "type": this.type }
            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {'Content-type': 'application/json'},
            }).then(function(response){
                return response.json()
            })
            .then(function(result){
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
     color:darkblue;
 }
 form {
     border: 2px solid navy;
     width: 230px;
     text-align: center;
     margin: 2em auto;
     position: absolute;
     top: 1px;
     right: 11%;
 }
</style>