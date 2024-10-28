import Contacto from "../components/Contacto.vue";
import Deportes from "../components/Deportes.vue";
import Habitaciones from "../components/Habitaciones.vue";
import Inicio from "../components/Inicio.vue";
import Servicios from "../components/Servicios.vue";

import { createRouter, createWebHashHistory } from "vue-router";



const routes = [
    { path: "/", component: Inicio },
    { path: "/Habitaciones", component: Habitaciones },
    { path: "/Deportes", component: Deportes },
    { path: "/Contacto", component: Contacto },
    { path: "/Servicios", component: Servicios },
    
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
