import { createApp } from 'vue'
import { Quasar } from 'quasar'
import { createPinia } from 'pinia'
// import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router/index'
import quasarUserOptions from './quasarUserOptions'
import './style/index.scss'

const pinia = createPinia()
// pinia.use(piniaPersist)

createApp(App)
    .use(router)
    .use(pinia)
    .use(Quasar, quasarUserOptions)
    .mount('#app')
