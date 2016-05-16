import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './component/Welcome.vue'
import App from './component/App.vue'
import Setting from './component/Setting.vue'
import Remove from './component/Remove.vue'

Vue.config.debug = true


// install router
Vue.use(Router)

// routing
var router = new Router()


router.map({
  '/':{
    component: Welcome 
  },
  '/setting': {
    component: Setting
  },
  '/remove': {
    component: Remove
  }
})




router.start(App, '#app')