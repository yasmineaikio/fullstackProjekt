import Vue from 'vue'
import UUID from 'vue-uuid';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
library.add(faCog)
library.add(faSearch)
library.add(faBook)
library.add(faAngleDown)
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(UUID);
library.add(faAngleUp)
library.add(faCheck)

import App from './components/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
