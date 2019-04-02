import Vue from "vue"
import Router from "vue-router"
import Login from "../components/login.vue"
import Logout from "../components/logout.vue"
import Users from "../components/users.vue"
import Books from '../components/GetBooks.vue'
import Profile from '../components/Userprofile.vue'
import Home from '../components/home.vue'
import Result from '../components/result.vue'
import Admin from '../components/admin.vue'
import Contact from '../components/contact.vue'
import Manage from '../components/addBook.vue'
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
    {
    component: Home,
    name: "Home",
    path: '/'
    },
    {
    component: Logout,
    name: "Logout",
    path: '/logout'
    },
    {
    component: Result,
    name: "result",
    path: '/result'
    },
    {
    component: Admin,
    name: "admin",
    path: '/admin'
    },
    {
      component: Contact,
      name: "contact",
      path: '/contact'
      },
      {
        component: Manage,
        name: "managebooks",
        path: '/managebooks'
        },
  ]
})
