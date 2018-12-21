import Vue from 'vue'
import App from './App'
import router from './router'
import {CellGroup,Cell,Tabbar,TabbarItem,Stepper,PullRefresh,Button,Row,Col,Search,Swipe,SwipeItem,Lazyload,List,Field,NavBar, Tab, Tabs} from 'vant'//引入我们需要使用的组件


//所有需要使用的组件都需要在这里引入和注册
Vue.config.productionTip = false

//注册需要使用的组件
Vue.use(CellGroup).use(Cell).use(TabbarItem).use(Tabbar).use(Stepper).use(PullRefresh).use(Tabs).use(Tab).use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
