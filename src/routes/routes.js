import Contacto from "../components/Contacto.vue"
import Deportes from "../components/Deportes.vue"
import Habitaciones from "../components/Habitaciones.vue"
import Inicio from "../components/Inicio.vue"
import Servicio from "../components/Servicio.vue"

import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    { path: "/Servicio", component: Servicio },
    {path:"/Habitaciones", component:Habitaciones},
    { path: "/Deportes", component: Deportes },
    { path: "/Contacto", component: Contacto },
    {path:"/", component:Inicio}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})