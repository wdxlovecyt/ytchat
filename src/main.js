import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import router from './router/index'
//import VueSocketIO from 'vue-socket.io'

// Vue.use(new VueSocketIO({
//     debug: true,
//     connection: 'http://124.220.17.233:8888',  //

// }))
Vue.use(ElementUI) //使用elementUI 
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$bus = new Vue()

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
