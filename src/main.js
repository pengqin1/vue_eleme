import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

// 0
Vue.use(VueRouter)
Vue.use(VueResource)

// 1
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

// 2. 定义路由
const routes = [
  { path: '/', component: goods },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    // mode: 'history',
    // base: __dirname,
    routes: routes  // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例
new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')

// 现在，应用已经启动了！
