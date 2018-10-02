// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store'
import VueYoutube from 'vue-youtube'

Vue.config.productionTip = false
Vue.use(VueYoutube)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
