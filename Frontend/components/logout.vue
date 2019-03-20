<template>
   <div>
       <button @click="logout()">Logga ut</button>
   </div> 
</template>

<script>
import router from "../router" 
export default {
    methods: {
        logout() {
            console.log( this.$cookie.get('Cookie'));
            let info = {'Cookie': this.$cookie.get('Cookie')}
            fetch('http://localhost:3000/logout', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {'Content-type': 'application/json'},
            }).then(function(response) {
                // alert("Du har loggat ut")    
                // router.push("/")
            })
            .then(function(result){
                console.log(result)
            })
        }
    }
}
</script>

<style scoped>
    button {
        text-decoration: none;
        color:#fff;
        padding: 10px 10px;
        background: #000;
        border: 1px #999 solid;
        font-size: medium;
        float: right;
        cursor: pointer;
    }
</style>

