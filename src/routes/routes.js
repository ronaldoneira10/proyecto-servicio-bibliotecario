import Biblioteca from "../views/Biblioteca.vue"
import Catalogo from "../views/Catalogo.vue"
import Usuarios from "../views/Usuarios.vue"
import Prestamos from "../views/Prestamos.vue"
import Historial from "../views/Historial.vue"
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: "/", component: Biblioteca },
  { path: "/Biblioteca", component: Biblioteca },
  { path: "/Catalogo", component: Catalogo },
  { path: "/Usuarios", component: Usuarios },
  { path: "/Prestamos", component: Prestamos },
  { path: "/Historial", component: Historial }
]

export const router = createRouter({
  routes,
  history: createWebHashHistory()
})
