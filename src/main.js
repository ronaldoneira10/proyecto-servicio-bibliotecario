import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import { router } from './routes/routes.js'

import App from './App.vue'

import './style.css'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}
})

app.use(createPinia())
app.use(router)

app.mount('#app')