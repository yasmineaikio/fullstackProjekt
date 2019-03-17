import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
library.add(faCog)

import App from './components/App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

