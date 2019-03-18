import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
library.add(faCog)
library.add(faSearch)
library.add(faAngleDown)

import App from './components/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})
