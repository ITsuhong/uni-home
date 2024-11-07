import App from './App'
import * as Pinia from 'pinia';
import piniaLoading from '@/stores/pinia-loading.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
   pinia.use(piniaLoading)
  app.use(pinia);
  return {
    app,
    Pinia
  }
}
// #endif