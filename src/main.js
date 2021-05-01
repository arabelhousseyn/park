import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSimpleAlert from "vue-simple-alert";
import 'bootstrap';
import jquery from 'jquery';
window.$ = window.jquery = jquery;
import 'popper.js';
import './assets/css/app.css'
import './assets/css/app.scss'
import './assets/js/app'
import VueBarcodeScanner from 'vue-barcode-scanner'
import common from  './sharer/common'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignInAlt,faPowerOff,faCar,faMotorcycle,faFileInvoice,faBox,faDoorOpen,faDoorClosed,faArrowLeft,faPlus,faQrcode,faPrint,faCheck,faTicketAlt,faMoneyBill,faBell,faPen,faRecycle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSignInAlt)
library.add(faPowerOff)
library.add(faCar)
library.add(faMotorcycle)
library.add(faFileInvoice)
library.add(faBox)
library.add(faDoorOpen)
library.add(faDoorClosed)
library.add(faArrowLeft)
library.add(faPlus)
library.add(faQrcode)
library.add(faPrint)
library.add(faCheck)
library.add(faTicketAlt)
library.add(faMoneyBill)
library.add(faBell)
library.add(faPen)
library.add(faRecycle)
Vue.component('ic', FontAwesomeIcon)

Vue.mixin(common)
Vue.use(VueSimpleAlert)
Vue.use(VueBarcodeScanner)

Vue.config.productionTip = false



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
