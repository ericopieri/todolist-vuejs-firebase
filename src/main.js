import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style.css'
import './plugins/firebase.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faBars, faArrowLeft, faHome, faSignOutAlt, faIdBadge, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserCircle)
library.add(faIdBadge)
library.add(faPaperPlane)
library.add(faSignOutAlt)
library.add(faHome)
library.add(faBars)
library.add(faArrowLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
