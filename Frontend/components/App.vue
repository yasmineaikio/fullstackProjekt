<template>
<div class="container">
  <header>
    <br>
    <a id="homelink"><router-link to="/">Startsida</router-link></a>
    <ul>
      <li><router-link to="/books">Böcker</router-link></li>
      <li v-on:click="auth()"><router-link v-bind:to="link">Mina sidor</router-link></li>
      <li><router-link to="/users">Bli medlem</router-link></li>
      <li v-if="this.$cookie.get('Cookie')"><logout></logout></li>
      <li v-else><router-link class="login-btn" to="/login">Logga in</router-link></li>
    </ul>
  </header>
  <router-view></router-view>
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

  export default {
    data () {
      return {
            link:'/'
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
    },
    router,
    methods: {
      auth() {
        //Kollar om user är inloggad (alex)
        if (this.$cookie.get('Cookie')) {
          this.link = '/profil'
          router.push("/profil")
          console.log(this.$cookie.get('Cookie'));
          
        } else {
          alert('Du måste logga in först!')
          this.link = '/login'
          router.push("/login")
        }
      }
    },
  }
</script>

<style scoped>
#homelink a {
  text-decoration: none;
  color:#666;
  padding: 10px 20px;
  margin: 2em 0;
  font: 1.6em cursive;
  border: inset #999 3px;
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
}
li a {
  text-decoration: none;
  color:#fff;
  padding: 10px 20px;
  background: #666;
}
.login-btn {
  border-top: 4px solid darkseagreen;
  border-radius: 2px;
}
.container {
  position: relative;
}
</style>
