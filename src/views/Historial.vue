<template>
  <q-page class="biblioteca-fondo q-pa-md">

    <div class="biblioteca-contenedor">

    <div class="titulo-seccion q-mb-lg">
      📋 Historial de préstamos
    </div>

    <q-card class="q-mb-lg">

      <q-card-section>

        <div class="text-h6 q-mb-md">
          Filtrar historial
        </div>

        <q-select
          v-model="libroSeleccionado"
          :options="opcionesLibros"
          label="Buscar por libro"
          outlined
          clearable
          emit-value
          map-options
          class="q-mb-md"
        />

        <q-select
          v-model="usuarioSeleccionado"
          :options="opcionesUsuarios"
          label="Buscar por usuario"
          outlined
          clearable
          emit-value
          map-options
        />

      </q-card-section>

    </q-card>

    <q-card>

      <q-card-section>
        <div class="text-h6">
          Historial
        </div>
      </q-card-section>

      <q-list bordered separator>

        <q-item
          v-for="prestamo in prestamosFiltrados"
          :key="prestamo.id"
        >

          <q-item-section>

            <q-item-label>
              📖 {{ obtenerLibro(prestamo.libroId) }}
            </q-item-label>

            <q-item-label caption>
              👤 {{ obtenerUsuario(prestamo.usuarioId) }}
            </q-item-label>

            <q-item-label caption>
              Fecha del préstamo: {{ prestamo.fechaPrestamo }}
            </q-item-label>

            <q-item-label
              v-if="prestamo.fechaDevolucion"
              caption
            >
              Fecha de devolución: {{ prestamo.fechaDevolucion }}
            </q-item-label>

          </q-item-section>

          <q-item-section side>
            <q-badge :color="prestamo.estado === 'Prestado' ? 'orange' : 'positive'">
              {{ prestamo.estado }}
            </q-badge>
          </q-item-section>

        </q-item>

        <q-item v-if="prestamosFiltrados.length === 0">
          <q-item-section>
            No hay préstamos que coincidan con el filtro.
          </q-item-section>
        </q-item>

      </q-list>

    </q-card>

      </div>

</q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useBibliotecaStore } from '../stores/biblioteca.js'

const biblioteca = useBibliotecaStore()

const libroSeleccionado = ref(null)
const usuarioSeleccionado = ref(null)

const opcionesLibros = computed(() =>
  biblioteca.libros.map(libro => ({
    label: libro.titulo,
    value: libro.id
  }))
)

const opcionesUsuarios = computed(() =>
  biblioteca.usuarios.map(usuario => ({
    label: usuario.nombre,
    value: usuario.id
  }))
)

const prestamosFiltrados = computed(() => {

  return biblioteca.prestamos.filter(prestamo => {

    const coincideLibro =
      !libroSeleccionado.value ||
      prestamo.libroId === libroSeleccionado.value

    const coincideUsuario =
      !usuarioSeleccionado.value ||
      prestamo.usuarioId === usuarioSeleccionado.value

    return coincideLibro && coincideUsuario
  })

})

function obtenerLibro(id) {
  const libro = biblioteca.libros.find(libro => libro.id === id)
  return libro ? libro.titulo : 'Libro no encontrado'
}

function obtenerUsuario(id) {
  const usuario = biblioteca.usuarios.find(usuario => usuario.id === id)
  return usuario ? usuario.nombre : 'Usuario no encontrado'
}
</script>
