import Vue from "vue"  
import Router from "vue-router"  
import Login from "../components/login.vue"  
import Users from "../components/users.vue"  
import Books from '../components/GetBooks.vue'
import Profile from '../components/Userprofile.vue'
Vue.use(Router)  
export default new Router({  
  routes: [
    {
      path: "/users",
      name: "Users",
      component: Users
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
    component: Books,
    name: "Books",
    path: '/books'   
    },
    {
    component: Profile,
    name: "Profile",
    path: '/profil'   
    },
  ]
})