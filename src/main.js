import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./routes/routes.js"

// Importaciones de Quasar
import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import iconSet from 'quasar/icon-set/material-icons'

// Crear la aplicación de Vue
const app = createApp(App)

// Configurar Quasar en la aplicación
app.use(Quasar, {
  plugins: {}, // Si utilizas plugins de Quasar, agrégalos aquí
  iconSet: iconSet, // Establece el conjunto de iconos a usar (material-icons)
})

// Configurar el enrutador
app.use(router)

// Montar la aplicación en el contenedor #app
app.mount('#app')
