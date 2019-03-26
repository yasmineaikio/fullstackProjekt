<template>
  <div class="container" id="profilepagemain" v-if="this.$cookie.get('Cookie')">
    <section id ="hero" class="hero has-background-grey">
        <div class="hero-body">
            <div class="container">
            <h1 class="title has-text-white-bis">
                Välkommen, {{ this.name }}!
            </h1>
            <hr>
            <h2 class="subtitle has-text-white-bis">
               <strong class="has-text-white-bis"> Adminuppgifter: </strong> {{ this.realname }} |  | {{ this.address }}
            </h2>
            </div>
        </div>
    </section>
    <div class="columns has-text-centered">
        <div class="column is-full has-background-grey-dark has-text-white-bis">
            <div class="is-center">
                <a class="button is-light is-outlined">Ta bort användare</a> <a class="button is-light is-outlined">Uppdatera användare</a>
                <router-link class="button is-light is-outlined" to="/books">Lägg till nya böcker</router-link>
            </div>
        </div>
    </div>
    <div class="columns">
       <div class="column is-half has-background-grey-light">
           <div class="has-background-white">
               <nav class="level">
                    <div class="level-item has-text-centered">
                        <div class="holder left">
                            <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Användare</h3>
                            <p v-for="inloggad in logedIn" class="is-size-6  has-text-left">{{inloggad.user}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Behörighet</h3>
                        <p v-for="inloggad in logedIn" class="is-size-6  has-text-left">{{inloggad.type}}</p>
                        </div>
                    </div>
                </nav>
           </div>
       </div>
       <div class="column is-half has-background-grey-light">
           <div class="has-background-white"> 
              <h3>Utlånade böcker</h3> 
            </div>
       </div>
    </div>
  </div> 
</template>

<script>
import router from "../router" 
export default {
    mounted() {
        this.getInfo()
    },
    data() {
        return {
        name: '',
        realname: '',
        address: '',
        logedIn: [],
        allUsers: [],
        }
    },
    router,
    methods: {
      getInfo() {
        fetch('http://localhost:3000/login')
        .then(response => response.json())
          .then (result => {
            for (let index = 0; index < result.length; index++) {
                this.logedIn.push(result[index])
            }  
            //Hämtar namnet på usern som är inloggad utifrån userns cookie (Alex)
            this.name = result.find(value => value.token === this.$cookie.get('Cookie')).user
          })

        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then (result => {
            for (let index = 0; index < result.length; index++) {
                this.allUsers.push(result[index])
            }  
            this.allUsers.push(result)
            this.realname = result.find(value => value.name === this.name ).realname
            this.email = result.find(value => value.name === this.name ).email
            this.address = result.find(value => value.name === this.name ).address
        })
  
        }
    },          
}
</script>

<style scoped>
#profilepagemain {
  font-family: 'Work Sans', sans-serif;
  margin:0 2em;
}
@media (max-width: 420px) {
    #profilepagemain {
        margin:0;
    }
}
#profilepagebooks {
  padding:0 4px 4px 4px;
}

#hero {
    margin-top: 10px;
}

.columns {
    margin: 0.5em auto;
}

#h3 {
    padding: 6px 20px;
}

.holder {
    width: 100%;
}

.holder.left {
    border-right: 2px #4A4A4A solid;
}

.holder p {
    padding: 5px;
}

</style>

