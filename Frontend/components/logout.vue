<template>
    <a class="logout-btn" @click="logout()">Logga ut</a>
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
                alert("Du har loggat ut")    
                router.push("/")
            })
            .then(function(result){
                console.log(result)
            })
            this.$cookie.delete('Cookie')
        }
    }
}
</script>

<style scoped>
    .logout-btn {
     text-decoration: none;
     color:#fff;
     border-top: #c00 4px solid;
     padding: 10px 20px;
     background: #666;
     cursor: pointer;
     display: inline;
    }
    .logout-btn:hover:before {
     visibility: hidden;
    }
</style>

