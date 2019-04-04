<template>
    <div>
        <form @submit.prevent="login()">
            <h4>Inloggning</h4>
            <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Användernamn" v-model="name" required>
                <span class="icon is-small is-left">
                    <font-awesome-icon class="footer-icon twitter" :icon="{ prefix: 'fa', iconName: 'user' }"/>
                </span>
            </p>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="password" placeholder="Lösenord" v-model="password" required>
                    <span class="icon is-small is-left">
                        <font-awesome-icon class="footer-icon twitter" :icon="{ prefix: 'fa', iconName: 'lock' }"/>
                    </span>
                </p>
            </div>
            <button class="button" type="submit">Logga in</button>
        </form>
    </div>
</template>
<script>
import router from "../router" 
import  uuid  from 'vue-uuid'
import { Dialog } from 'buefy/dist/components/dialog'
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
            let newID = this.$uuid.v1()
            var cookie =  () => this.$cookie.set('Cookie', newID , 1)
            var adminCookie =  () => this.$cookie.set('adminCookie', newID , 1)
            var userinfo = {'name': this.name, 'password': this.password, 'ID':newID} 
            fetch('http://localhost:3000/login', {
                method: 'POST',
                body: JSON.stringify(userinfo),
                headers: {'Content-type': 'application/json'},
            }).then(function(response) {
                if (response.status === 201) {  
                    cookie()
                    router.push("/profil")
                }
                else if (response.status === 205) {
                    adminCookie()
                    router.push("/admin")
                }
                else {
                    Dialog.alert({
                    title: 'Ops..',
                    message: 'Fel användernamn eller lösenord!',
                    confirmText: 'Försök igen',
                    type: 'is-dark',
                })
                    //eller skapa nytt konto   
                    router.push("/login")
                }
            })
        }
    },
}
  
</script>
<style scoped>
 h4 {
     color:#666;
     /* font-family: cursive; */
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
 /* input[type=text],input[type=password], input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
} */

.input:focus {
    border-color: #F3C954;
    box-shadow: 0 0 0 0.125em rgba(179, 153, 8, 0.464);
}

button[type=submit] {
    width: 100%;
    background-color: #F3C954;
    color: #000;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    font-weight: 900;
    text-transform: uppercase;
}

@media (max-width: 768px) {
    form {
        width: 100%;
    }
}

</style>