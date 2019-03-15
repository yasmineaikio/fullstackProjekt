<template>
    <div>
        <form @submit.prevent="login()">
            <h4>Logga in</h4>
            <p>Fungerar sådär än så länge inloggad user hämtas från /login</p>
            <input type="text" placeholder="Användernamn" v-model="name"><br>
            <input type="password" placeholder="Lösenord" v-model="password"><br>
            <button type="submit">Logga in</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            name: '',
            password: '',
            email: '',
            id: null,
            type: 'user'
        }
    },
    methods: {
        login() {
            var userinfo = {'name': this.name, 'password': this.password} 
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(userinfo),
                headers: {'Content-type': 'application/json'},
            }).then(function(response){
                return response.json()
            })
            .then(function(result){
                console.log(result)
            })
            .catch(e => {
                console.log(e) 
            })
        }
    },
}
  
</script>
<style scoped>
 h4 {
     color:red;
 }
 form {
     border: 2px solid grey;
     width: 230px;
     text-align: center;
     margin: 2em auto;
     position: absolute;
     top: 1px;
     right: 25%;
 }
</style>