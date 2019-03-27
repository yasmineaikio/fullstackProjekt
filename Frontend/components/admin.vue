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
                <a @click="removeUser()" class="button is-light is-outlined">Ta bort användare</a>
                <router-link class="button is-light is-outlined" to="/books">Lägg till nya böcker</router-link>
            </div>
        </div>
    </div>
    <div class="columns">
       <div class="column is-half has-background-grey-light">
           <div class="col has-background-white has-text-centered "> 
              <h3 class="title-column"><font-awesome-icon :icon="{ prefix: 'fa', iconName: 'user' }"/> Alla användare</h3> 
            </div>
           <div class="has-background-white">
               <nav class="level">
                    <div class="level-item has-text-centered">
                        <div class="holder left">
                            <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Användare</h3>
                            <p v-for="inloggad in logedIn" class="is-size-6  has-text-left">{{inloggad.user}} <span class="online"></span></p>
                            <p v-for=" user in allUsers" class="is-size-6  has-text-left">{{user.name}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Behörighet</h3>
                        <p v-for="inloggad in logedIn" class="is-size-6  has-text-left">{{inloggad.type}}</p>
                        <p v-for=" user in allUsers" class="is-size-6  has-text-left">{{user.type}}</p>
                        </div>
                    </div>
                </nav>
           </div>
       </div>
       <div class="column is-half has-background-grey-light">
           <div class="col has-background-white has-text-centered "> 
              <h3 class="title-column"><font-awesome-icon  :icon="{ prefix: 'fa', iconName: 'book' }"/> Utlånade böcker</h3> 
            </div>
            <div class="has-background-white">
               <nav class="level">
                    <div class="level-item has-text-centered">
                        <div class="holder left">
                            <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Bok</h3>
                            
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Användare</h3>
                        
                        </div>
                    </div>
                </nav>
           </div>
       </div>
    </div>
  </div> 
</template>

<script>
import router from "../router" 
import { Dialog } from 'buefy/dist/components/dialog'
const ModalForm = {
        data () {
            return {
                userName:'',
            }
        },
        methods: {
            remover() {
                let toBeDelete = {'userName': this.userName}
                fetch('http://localhost:3000/admin', {
                    method: "DELETE",
                    body: JSON.stringify(toBeDelete),
                    headers: {'Content-type': 'application/json'}
                }).then(function(response) {
                     if(response.status === 200) {
                        location.reload()
                     }else {
                        Dialog.alert('Fel användarnamn! Försök igen!')  
                     }    
                    })
          },
        },
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Ta bort användare</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Ange användare som ska tas bort">
                            <b-input
                                type="text"
                                v-model="userName"
                                placeholder="Användarnamn"
                                required>
                            </b-input>
                        </b-field>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Stäng</button>
                        <button @click="remover()" class="button is-warning">Radera</button>
                    </footer>
                </div>
            </form>
        `
    }
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
      removeUser() {
            this.$modal.open({
                parent: this,
                component: ModalForm,
                hasModalCard: true
            })
      },
      getInfo() {
        fetch('http://localhost:3000/login')
        .then(response => response.json())
          .then (result => {
            for (let index = 0; index < result.length; index++) {
                this.logedIn.push(result[index])
            }  
            //Hämtar namnet på usern som är inloggad med hjälp av userns cookie (Alex)
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

.online {
    padding: 5px;
    background: green;
    border-radius: 100%;
    float: right;
    margin: 6px;
}

.title-column {
    font-size: 1.5rem;
    font-weight: 900;
    font-family: 'Times New Roman', Times, serif
}

.col {
    border: #4A4A4A solid 3px;
}
</style>

