import Vue from 'vue'
import router from './router'
import UUID from 'vue-uuid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import moment from 'moment'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.config.devtools = true

Vue.use(Buefy)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
library.add(faCog)
library.add(faUser)
library.add(faSearch)
library.add(faBook)
library.add(faAngleDown)
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(UUID);
library.add(faAngleUp)
library.add(faCheck)
library.add(faFacebook)
library.add(faTwitter)
library.add(faEnvelope)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAek2X6YRcS4XJ1SalmKH7YsKda63eMau0', 
    libraries: 'places',
  }
})
import App from './components/App.vue'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
