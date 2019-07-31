import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'
import firebase from 'firebase/app'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMq from 'vue-mq'

Vue.use(VueMq,{
	breakpoints: {
		mobile:575,
		tablet:900,
		labtop:1250,
		desktop: Infinity
	}
})

Vue.config.productionTip = false

Vue.use(Vuetify, {
	iconfont: 'fa',
	theme: {
		primary: '#3f51b5',
		secondary: '#b0bec5',
		accent: '#8c9eff',
		error: '#b71c1c'
	}
})

Vue.use(VueSimplemde)

new Vue({
  router,
  store,
	created(){
		firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {


  		} else {

  		}
		});
	},
  render: h => h(App)
}).$mount('#app')
