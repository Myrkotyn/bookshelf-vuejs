// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'

Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.filter('date', function (value) {
  return moment(String(value)).format('MM/DD/YYYY')
})
Vue.http.options.root = 'http://bookshelf.work/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  http: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
})
