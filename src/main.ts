import {createApp} from 'vue'
import App from './App.vue'
import pinia from './store'
import router from './router'
import './styles/reset.css'

const app = createApp(App)
// 使用pinia初始化状态管理
app.use(pinia)
// 使用vue-router初始化路由
app.use(router)
// 挂载应用
app.mount('#root')
