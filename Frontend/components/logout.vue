<template>
    <a class="logout-btn" @click="logout()"> Logga ut</a>
</template>

<script>
import router from "../router" 
import { Snackbar } from 'buefy/dist/components/snackbar'
export default {
    methods: {
        logout() {
            if(this.$cookie.get('Cookie')) {
                var info = {'Cookie': this.$cookie.get('Cookie')}
                var deleteCookie = () => {
                    this.$cookie.delete('Cookie')
                }
            } else if (this.$cookie.get('adminCookie')) {
                var info = {'Cookie': this.$cookie.get('adminCookie')}
                var deleteCookie = () => {
                   this.$cookie.delete('adminCookie')    
                }
            }
            fetch('http://localhost:3000/logout', {
                method: 'POST',
                body: JSON.stringify(info),
                headers: {'Content-type': 'application/json'},
            }).then(function(response) { 
                router.push("/")
            }).then(() => {
                deleteCookie()
                location.reload()
            })
        }
    }
}
</script>

<style scoped>
    .logout-btn {
     text-decoration: none;
     color:#fff;
     border-top: rgb(89, 145, 5) 8px solid;
     padding: 10px 20px;
     background: #666;
     cursor: pointer;
     display: inline;
    }
    .logout-btn:hover:before {
     visibility: hidden;
    }

</style>

