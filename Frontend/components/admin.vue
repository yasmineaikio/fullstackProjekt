<template>
  <div class="container" id="profilepagemain" v-if="this.$cookie.get('adminCookie')">
    <section id ="hero" class="hero has-background-grey">
        <div class="hero-body"> 
            <h1 class="title has-text-white-bis has-text-centered">
                Välkommen, {{ this.name }}!
            </h1>
            <hr>
        </div>
    </section>
    <div class="columns">
        <div class="column is-full has-background-grey-dark has-text-white-bis">
            <div>
                <a @click="removeUser()" class="button is-light is-outlined">Ta bort användare</a>
                <router-link class="button is-light is-outlined" to="/books">Lägg till nya böcker</router-link>
                <a @click="isOpen = !isOpen" aria-controls="contentIdForA11y2" class="inbox-btn button is-warning">Inbox(<span>{{antal}}</span>)</a>
            </div>
        </div>
    </div>
    <b-collapse aria-id="contentIdForA11y2" :open.sync="isOpen">
            <div>
                <div class="container">
                    <div class="column is-full" v-for="msg in inbox">
                        <b-collapse :open="false" aria-id="contentIdForA11y1">
                            <h2 class="msg-title is-size-5 has-text-weight-bold" slot="trigger" aria-controls="contentIdForA11y1">{{msg.subject}} <span class="msg-date has-text-centered"> <i> {{msg.date}} </i> </span> <span class="msg-remover" @click="removeMsg(msg.id)">Ta bort</span></h2>
                            <div class="notification">
                                <div class="content">
                                    <font-awesome-icon class="msg-icon" :icon="{ prefix: 'fa', iconName: 'user' }"/><span class="is-size-5"> {{msg.name}} </span>
                                    <font-awesome-icon class="msg-icon mail" :icon="{ prefix: 'fa', iconName: 'envelope' }"/><span class="is-size-5" style="cursor:pointer;"> {{msg.email}} </span>
                                    <hr class="msg-hr">
                                    <h3>Meddelandet:</h3>
                                    <p class="msg-content"> {{msg.content}} </p>
                                </div>
                            </div>
                        </b-collapse>
                    </div>
                </div>   
            </div>
    </b-collapse>
    <div class="columns">
       <div class="column is-full has-background-grey-light">
           <div class="col has-background-white has-text-centered "> 
              <h3 class="title-column"><font-awesome-icon :icon="{ prefix: 'fa', iconName: 'user' }"/> Medlemmar</h3> 
            </div>
           <div class="has-background-white">
               <nav class="level">
                    <div class="level-item has-text-centered">
                        <div class="holder left">
                            <h3 id="h3" class=" has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Alla medlemmar</h3>
                            <p v-for=" user in allUsers" class="is-size-5  has-text-left">&#9737; {{user.name}}</p>
                        </div>
                    </div>
                    <div class="level-item has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-4 has-text-weight-bold">Inloggade</h3>
                        <p v-for="inloggad in logedIn" class="is-size-5  has-text-left"> &#10050; {{inloggad.user}} <span class="online"></span></p>
                        </div>
                    </div>
                </nav>
           </div>
       </div>
    </div>
    <div class="columns">
        <div class="books-con column is-full has-background-grey-light">
           <div class="col has-background-white has-text-centered "> 
              <h3 class="title-column"><font-awesome-icon  :icon="{ prefix: 'fa', iconName: 'book' }"/> Utlånade böcker</h3> 
           </div>
           <div class="has-background-white">
               <div class="columns">
                    <div class="books-col column is-one-quarter has-text-left">
                        <div class="holder">
                            <h3 id="h3" class="has-background-grey-dark has-text-white is-size-5 has-text-weight-bold">Titel</h3>
                            <p  v-for="book in BookInfo"> {{book}}</p>
                        </div>
                    </div>
                    <div class="books-col column is-one-quarter has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-5 has-text-weight-bold">Medlem</h3>
                        <p v-for="user in UserInfo"> {{user}}</p>
                        </div>
                    </div>
                    <div class="books-col column is-one-quarter has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-5 has-text-weight-bold">Lånedatum</h3>
                        <p v-for="date in LoanDate">{{date}}</p>
                        </div>
                    </div>
                    <div class="books-col column is-one-quarter has-text-centered">
                        <div class="holder">
                        <h3 id="h3" class="has-background-grey-dark has-text-white is-size-5 has-text-weight-bold">Återlämningsdatum</h3>
                        <p v-for="rDate in ReturnDate">{{rDate}}</p>
                        </div>
                    </div>
                </div>
           </div>
       </div>
    </div>    
  </div> 
</template>

<script>
import router from "../router" 
import { Snackbar } from 'buefy/dist/components/snackbar'
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
                        Dialog.alert(
                            {message: 'Fel användarnamn! Försök igen!',
                            confirmText: 'Försök igen',
                            type: 'is-dark'})  
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
    created() {
         fetch('http://localhost:3000/loans')
            .then(response => response.json())
            .then (result => {
                for (let index = 0; index < result.length; index++) {
                    this.loanBook.push(result[index].bookId)
                    this.loanUser.push(result[index].userId)
                    this.ReturnDate.push(result[index].returnDate)
                    this.LoanDate.push(result[index].loanDate)
                    let loan = {'user':result[index].userId, 'book':result[index].bookId}
                    this.loans.push(loan)
                }                  
            }).then(() => {
                this.fetchLoans()
            })
        
        this.getInfo()
    },
    data() {
        return {
            name: '',
            logedIn: [],
            allUsers: [],
            loans: [],
            BookInfo: [],
            UserInfo: [],
            loanBook: [],
            loanUser: [],
            LoanDate: [],
            ReturnDate: [],
            inbox: [],
            antal: 0,
            isOpen: false,
        }
    },
    router,
    methods: {
        fetchMessages() {
             fetch('http://localhost:3000/inbox').then(response => response.json()).then(result => {
                this.inbox = result
                this.antal = result.length
            })
        },
        removeMsg(id) {
           let msgId = {'id':id} 
           fetch('http://localhost:3000/inbox', {
               method: 'DELETE',
               body: JSON.stringify(msgId),
               headers: {'Content-type': 'application/json'}
           })
           .then(() => {
               this.fetchMessages()
               Snackbar.open('Meddelandet har tagits bort!')
           }) 
            
        },
        removeUser() {
            this.$modal.open({
                parent: this,
                component: ModalForm,
                hasModalCard: true
            })
        },
        fetchLoans() {
            for (let i = 0; i < this.loanBook.length; i++) {
                let loan = {'user':this.loanUser[i], 'book':this.loanBook[i]}   
                fetch('http://localhost:3000/getloans', {
                    method: 'POST',
                    body: JSON.stringify(loan),
                    headers: {'Content-type': 'application/json'},
                    }).then(response => response.json())
                    .then(result => {
                        this.BookInfo.push(result.title)
                        this.UserInfo.push(result.name)
                    })
            }
        },         
        getInfo() {
            // Hämtar relevanta uppgifter från databasen och pushar dem i arrays (Alex)
            fetch('http://localhost:3000/login')
            .then(response => response.json())
            .then (result => {
                for (let index = 0; index < result.length; index++) {
                    this.logedIn.push(result[index])
                }  
                //Hämtar namnet på Admin som är inloggad (Alex)
                this.name = result.find(value => value.token === this.$cookie.get('adminCookie')).user
            })

            fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then (result => {
                for (let index = 0; index < result.length; index++) {
                    this.allUsers.push(result[index])
                }  
            })
            
            this.fetchMessages()  
        },
    },
}
</script>

<style scoped>
#profilepagemain {
  font-family: 'Work Sans', sans-serif;
  margin:0 auto;
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
    text-transform: uppercase;
}

.holder {
    width: 100%;
    min-height: 200px;
}

.holder.left {
    border-right: 2px #4A4A4A solid;
}

.holder p {
    padding: 5px;
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.9);
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

.books-col {
    padding: 0.75rem 0;
}

.books-col p:nth-child(odd) {
    background: #ccc;
}

.books-con {
    min-height: 350px;
}

.msg-title {
    border-bottom: #4A4A4A solid 2px;
    padding: 0 10px;
}

.msg-title:hover {
    border-left: 4px solid #FFDB4A;
} 

.msg-remover {
    float: right;
    padding: 0 10px;
}

.msg-remover:hover {
    color: #c00;
    border-right:4px solid #c00;
}

.msg-date {
    position: absolute;
    left: 20%;
    opacity: 0.7;
    margin-left: 1em;
}

.inbox-btn {
    float: right;
    margin-right: 8px;
}

.msg-icon {
    font-size: 1.5em;
}

.msg-icon.mail {
    margin-left: 2em;
}

.content span {
    padding: 0 3px;
}

.msg-hr {
    border: 1px solid #FFDB4A;
}

.msg-content {
    padding: 30px;
    background: #fff;
    box-shadow: 1px 2px 3px 1px rgba(84, 82, 82, 0.7);
}
</style>

