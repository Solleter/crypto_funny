import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
const log = require('electron-log')
import DataEngine from './dataengine'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.prototype.$dataEngine = new DataEngine()

log.info('hello log')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
