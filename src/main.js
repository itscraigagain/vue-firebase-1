import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { auth } from './firebase'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
Vue.config.productionTip = false
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyCFdY5iHAzVvTwrF75vin27qW9gxWMn-qo', // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
  language: 'en', // Optional
  installComponents: true, // Optional (default: true) - false, if you want to locally install components
  vueGoogleMapsCompatibility: false, // Optional (default: false) - true, requires vue2-google-maps to be configured see https://github.com/xkjyeah/vue-google-maps
});

let app
auth.onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})
