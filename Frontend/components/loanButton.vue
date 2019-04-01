<template>
<div>
  <form>
    <button v-on:click="addLoan" type="submit">Låna</button>
  </form>
</div>
</template>

<script>
import router from '../router'
import moment from 'moment'
import { Dialog } from 'buefy/dist/components/dialog'
export default {
  props: ['bookId'],
  data() {
      return {
        loanDate: '',
        returnDate: '',
        bookId: this.bookId,
        userId: '',
        name: ''
      }
    },
    created(){
      fetch('http://localhost:3000/login')
      .then(response => response.json())
      .then (result => {
        this.name = result.find(value => value.token === this.$cookie.get('Cookie')).user
      })

      fetch('http://localhost:3000/users')
      .then(response => response.json())
      .then (result => {
        this.userId = result.find(value => value.name === this.name ).id
      })

    },
  methods: {
    addLoan (){
      if (this.$cookie.get('Cookie')) {
        this.loanDate = moment().format('YYYY/MM/DD')
        this.returnDate = moment().add(30, 'days').format('YYYY/MM/DD')

          fetch ('http://localhost:3000/loans', {
          body: '{ "returnDate": "' + this.returnDate + '", "loanDate": "' + this.loanDate +'", "userId": "' + this.userId + '", "bookId": "'
          + this.bookId + '"}',
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST'
        })
          .then (response => response.json())
          .then (result => {
            console.log('Boken är lånad');
          })
          Dialog.alert({
            title: 'Sådär',
            message: 'Du har nu lånat boken',
            confirmText: 'Mina sidor',
            type: 'is-dark',
          })
          router.push("/profil")
      }
      else {
        Dialog.alert({
          title: 'Ops..',
          message: 'Du måste logga in först!',
          confirmText: 'Logga in',
          type: 'is-dark',
        })
        router.push("/login")
      }

    }
  }
}
</script>

<style scoped>
button{
font-size:15px;
background-color: #F3C954;
border: 2px solid transparent;
padding: 10px 40px;
border-radius: 2px;
font-family: 'Work Sans', sans-serif;
}

button:hover {
  border: 2px solid grey;
}
</style>
