<template>
    <div>
        <form @submit.prevent="login()">
            <h4>Logga in</h4>
            <input type="text" placeholder="Användernamn" v-model="name"><br>
            <input type="password" placeholder="Lösenord" v-model="password"><br>
            <button type="submit">Logga in</button>
        </form>
    </div>
</template>
<script>
import router from "../router" 
import  uuid  from 'vue-uuid';
export default {
    data(){
        return {
            name: '',
            password: '',
            email: '',
            id: null,
            type: 'user',
        }
    },
    methods: {
        login() {
            var cookie = this.$cookie.set('Cookie', this.$uuid.v1(), 1)
            console.log(cookie);
            var userinfo = {'name': this.name, 'password': this.password, 'ID':this.$uuid.v1()} 
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(userinfo),
                headers: {'Content-type': 'application/json'},
            }).then(function(response) {
                if (response.status === 201) {
                    console.log("inloggad")    
                    router.push("/profil")
                } else {
                    alert("Fel användernamn eller lösenord! Försök igen!")    
                    router.push("/login")
                }
            })
            .then(function(result){
                console.log(result)
            })     
        }
    },
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
}


</style>