<template>
<div id="container">
  <header>
    <nav class="navbar is-light is-fluid" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a  id="homelink"><router-link to="/">Falkenbergs Bibliotek</router-link></a>
        <span class="logo-subtitle">Read all about it</span>
        <a style="height:2.25rem;" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
          <span style="height:2px;" class="has-text-white" aria-hidden="true"></span>
          <span style="height:2px;" class="has-text-warning" aria-hidden="true"></span>
          <span style="height:2px;" class="has-text-white" aria-hidden="true"></span>
        </a>
      </div>
      <div id="navMenu" class="navbar-menu is-fluid">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <ul>
                <li><router-link to="/books">Böcker</router-link></li>
                <li><router-link to="/contact">Kontakt</router-link></li>
                <li v-if="!this.$cookie.get('Cookie') && !this.$cookie.get('adminCookie')"><router-link to="/users">Bli medlem</router-link></li>
                <li v-if="this.$cookie.get('Cookie')" v-on:click="auth()"><router-link v-bind:to="link">Mina sidor</router-link></li>
                <li v-if="this.$cookie.get('adminCookie')"><router-link to="/admin">Administration</router-link></li>
              </ul>
              <a v-if="this.$cookie.get('Cookie') || this.$cookie.get('adminCookie')"><logout class="logout-btn"></logout></a>
              <a class="button is-warning" v-else><router-link class="login-btn" to="/login">Logga in</router-link></a>
            </div>
          </div>
        </div>
      </div>
    </nav>
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
    import EditBook from './editBook.vue'
    import ExtendButton from './extendButton.vue'

  export default {
    data () {
      return {
            link:'/',
            isAdmin: false,
      }
    },

    created() {
      document.addEventListener('DOMContentLoaded', () => {

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');

            });
          });
        }
      });
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
      'extend-button': ExtendButton,
    },
    router,
    methods: {
      auth() {
        //Kollar om user är inloggad
        if (this.$cookie.get('Cookie')) {
            this.link = '/profil'
            router.push("/profil")
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

#navMenu {
  background-color: #7A7A7A;
  color: white;
  box-shadow: none;
}

.navbar {
  background-color: #7A7A7A;
  color: white;
}
#homelink {
  position: relative;
  height: 80%;
}

#homelink a {
  text-decoration: none;
  color: white;
  padding: 0;
  margin: 2em 0;
  font-size: 1.5em;
  font-family: 'Source Serif Pro', sans-serif;
  text-transform: uppercase;
  /* border: inset #999 3px; */
}
#homelink:before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: 75%;
  bottom: 50%;
  border-top: 4px solid #F3C954;
  border-left: 4px solid #F3C954;
  border-color: #F3C954;
  background-color: none !important;
}
#homelink:after {
  content: '';
  position: absolute;
  bottom: 1px;
  right: -15px;
  left: 75%;
  top: 50%;
  border-bottom: 4px solid #F3C954;
  border-right: 4px solid #F3C954;
  border-color: #F3C954;
  background-color: none !important;
}

.logo-subtitle {
  position: absolute;
  bottom: 0;
  font-style: italic;
  margin: 0;
  font-size: 16px;
  text-shadow: 0px 0px 0.3px #F3C954;
  font-family: 'Lobster Two', cursive;
}

#homelink:active {
  color: #fff;
}
.login-btn, button {
  /* background-color: #F3C954; */
  color: black !important;
  /* border-top: 4px solid darkseagreen; */
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
  font-size:1.6em;
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


<style>
/* från home.vue */
@import url('https://fonts.googleapis.com/css?family=Source+Serif+Pro|Work+Sans');
  p, li, table, input, button, a {
    font-family: 'Work sans', sans-serif;
  }

  body {
  margin: 0;
}

#title {
  /* position: relative; */
  text-align: center;
  margin-top: 40px;
}

#title h1 {
  color: #7A7A7A;
  font-family: 'Source serif pro', sans-serif;
  font-size: 3.0em;
}

h1 {
    font-size: 1.6em;
    font-family: 'Source serif pro', serif;
}

h2 {
  font-size: 1.6em;
  font-family: 'Source serif pro', serif;
}

h3 {
  font-size: 1.4em;
  font-family: 'Source serif pro', sans-serif;
}

/*  från App.vues scoped-kod */
ul {
  list-style: none;
  margin: 5px;
  float: right;
}
li {
  display: inline;
  padding: 1px;
  font-family: 'Work sans', sans-serif;
  text-transform: uppercase;
}
li a {
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  position: relative;
  width: 100%;
}
li a:active, li a:focus, li a:checked, li a:hover {
  border: none;
  color:white;
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

/* från getBooks.vue */
input, td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}


@media (max-width:768px) {
    .buttons li {
    display: block;
    padding: 10px 0;;
  }
    .buttons li:before {
      content: '#';
      color:#F3C954;
      font-size:20px;

  }
  nav .buttons ul {
    border-top: 2px solid white;
  }
  nav .button.is-warning, .logout-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
