<template>
<div id="container">
  <header>
    <br>
    <a id="homelink"><router-link to="/">Falkenbergs bibliotek</router-link></a>
    <ul>
      <li><router-link to="/books">Böcker</router-link></li>
      <li><router-link to="/users">Bli medlem</router-link></li>
      <li v-on:click="auth()"><router-link v-bind:to="link">Mina sidor</router-link></li>
      <li v-if="this.$cookie.get('Cookie')"><logout></logout></li>
      <li v-else><router-link class="login-btn" to="/login">Logga in</router-link></li>
    </ul>
    <search-field></search-field>
  </header>
  <router-view></router-view>
  <footer>
    <br><br>
    <h3>©2019 Falkenbergs bibliotek</h3>
    <div class="footer-social">
       <font-awesome-icon class="footer-icon twitter" :icon="{ prefix: 'fab', iconName: 'twitter' }"/>
       <font-awesome-icon class="footer-icon facebook" :icon="{ prefix: 'fab', iconName: 'facebook' }"/>
    </div>
  </footer>
</div>
</template>

<script>
    import Home from './home.vue'
    import router from '../router';
    import Users from './users.vue'
    import Login from './login.vue'
    import Logout from './logout.vue'
    import Search from './search.vue'
    import AddBook from './addBook.vue'
    import Userprofile from './Userprofile.vue'
    import GetBooks from './GetBooks.vue'
    import LoanButton from './loanButton.vue'
    import Result from './result.vue'
    import { Dialog } from 'buefy/dist/components/dialog'
    import EventBus from '../eventbus.js'
    import Admin from './admin.vue'
    import EditBook from './editBookButton.vue'

  export default {
    data () {
      return {
            link:'/',
            isAdmin: false,
      }
    },
    components: {
      'search-field': Search,
      'add-book': AddBook,
      'user-profile': Userprofile,
      'users': Users,
      'get-books': GetBooks,
      'login': Login,
      'logout': Logout,
      'home': Home,
      'loan-button': LoanButton,
      'result': Result,
      'admin': Admin,
      'edit-book': EditBook,
    },
    router,
    methods: {
      checkUser() {
      // Kollar om inloggad user är ADMIN eller inte (Alex)
      fetch('http://localhost:3000/login')
      .then(response => {
          return response.json()
      })
      .then(result => {
          let inloggad = result.find(value => value.type === 'admin')
          if(inloggad.token === this.$cookie.get('Cookie') && inloggad.type === 'admin' ) {
            this.isAdmin = true
          }
      })
    },
      auth() {
        //Kollar om user är inloggad och skickar hen till rätt profilsida (alex)
        if (this.$cookie.get('Cookie')) {
          this.checkUser()
          if(this.isAdmin) {
            this.link = '/admin'
            router.push("/admin")
          }else {
            this.link = '/profil'
            router.push("/profil")
          }
        } else {
          Dialog.alert({
            title: 'Ops..',
            message: 'Du måste logga in först!',
            confirmText: 'Logga in',
            type: 'is-dark',
          })
          this.link = '/login'
          router.push("/login")
        }
      }
    },
  }
</script>

<style scoped>
header {
  background-color: #7A7A7A;
  color: white;
  padding: 40px;
  width: 100%;
}
#homelink a {
  text-decoration: none;
  color: white;
  /* padding: 10px 20px; */
  margin: 2em 0;
  font-size: 1.5em;
  font-family: 'Source Serif Pro', sans-serif;
  text-transform: uppercase;
  /* border: inset #999 3px; */
}
#homelink:active {
  color: #fff;
}
ul {
  list-style: none;
  margin: 5px;
  float: right;
}
li {
  display: inline;;
  padding: 1px;
  font-family: 'Work sans', sans-serif;
}
li a {
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  position: relative;
  width: 100%;
}

li a:active, li a:focus, li a:checked {
  border: none;
}
ul li a:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #F3C954;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
ul li a:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
.login-btn {
  background-color: #F3C954;
  color: black;
  /* border-top: 4px solid darkseagreen; */
  border-radius: 2px;
}
.login-btn:hover:before {
  visibility: hidden;
}
#container {
  position: relative;
  max-width: 100%;
}
footer {
  position: relative;
  background-image: url('http://greenish.haahe.net/wp-content/uploads/2018/12/footer1.png');
  min-height:300px;
  background-position: center;
  background-size: cover;
}
footer h3 {
  text-align: center;
  margin: 2em auto 0 auto;
  color:#7A7A7A;
}
.footer-social {
  text-align: center;
  padding: 10px;
}
.footer-icon {
  padding: 0 5px;
  font-size: 1.2em;
  cursor: pointer;
}
.footer-icon.twitter {
  color: #55acee;
}
.footer-icon.facebook {
  color:#3b5998;
}

</style>


<style >
/* Ej scoped style (Alex) */
  body {
  margin: 0;
}
</style>
