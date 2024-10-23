import { createApp } from 'vue'
import App from './App.vue'
import { router } from "./routes/routes.js"

// Importaciones de Quasar
import { Quasar } from 'quasar';
import quasarIconSet from 'quasar/icon-set/material-icons'; // Importa el set de íconos
import 'quasar/dist/quasar.css'; // Estilos de Quasar
import '@quasar/extras/material-icons/material-icons.css';

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// Importación de solo las funciones necesarias





// Crear la aplicación de Vue
const app = createApp(App)

// Configurar Quasar en la aplicación
app.use(Quasar, {
  plugins: {}, // Si utilizas plugins de Quasar, agrégalos aquí
  iconSet: quasarIconSet, // Habilita Material Icons
})

// Configurar el enrutador
app.use(router)

// Montar la aplicación en el contenedor #app
app.mount('#app')
