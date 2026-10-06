<template>
  <q-page class="biblioteca-fondo q-pa-md">

    <div class="biblioteca-contenedor">

    <div class="titulo-seccion q-mb-lg">
      📚 Préstamos
    </div>

    <q-card class="q-mb-lg">

      <q-card-section>

        <div class="text-h6 q-mb-md">
          Registrar préstamo
        </div>

        <q-select
          v-model="libroSeleccionado"
          :options="opcionesLibros"
          option-disable="disable"
          label="Seleccionar libro"
          outlined
          emit-value
          map-options
          class="q-mb-md"
        />

        <q-select
          v-model="usuarioSeleccionado"
          :options="opcionesUsuarios"
          label="Seleccionar usuario"
          outlined
          emit-value
          map-options
          class="q-mb-md"
        />

        <q-btn
          label="Registrar préstamo"
          color="primary"
          @click="registrarPrestamo"
        />

      </q-card-section>

    </q-card>

    <q-card>

      <q-card-section>
        <div class="text-h6">
          Préstamos registrados
        </div>
      </q-card-section>

      <q-list bordered separator>

        <q-item
          v-for="prestamo in biblioteca.prestamos"
          :key="prestamo.id"
        >

          <q-item-section>

            <q-item-label>
              Libro: {{ obtenerLibro(prestamo.libroId) }}
            </q-item-label>

            <q-item-label caption>
              Usuario: {{ obtenerUsuario(prestamo.usuarioId) }}
            </q-item-label>

            <q-item-label caption>
              Fecha: {{ prestamo.fechaPrestamo }}
            </q-item-label>

            <q-item-label caption>
              Estado:
              <q-badge :color="prestamo.estado === 'Prestado' ? 'orange' : 'positive'">
                {{ prestamo.estado }}
              </q-badge>
            </q-item-label>

          </q-item-section>

          <q-item-section side>
            <q-btn
              v-if="prestamo.estado === 'Prestado'"
              label="Devolver"
              color="secondary"
              outline
              @click="devolver(prestamo.id)"
            />
          </q-item-section>

        </q-item>

        <q-item v-if="biblioteca.prestamos.length === 0">
          <q-item-section>
            No hay préstamos registrados.
          </q-item-section>
        </q-item>

      </q-list>

    </q-card>

      </div>

</q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useBibliotecaStore } from '../stores/biblioteca.js'

const biblioteca = useBibliotecaStore()
const $q = useQuasar()

const libroSeleccionado = ref(null)
const usuarioSeleccionado = ref(null)

const opcionesLibros = computed(() =>
  biblioteca.libros.map(libro => ({
    label: `${libro.titulo} (${libro.disponibles} disponibles)`,
    value: libro.id,
    disable: libro.disponibles === 0
  }))
)

const opcionesUsuarios = computed(() =>
  biblioteca.usuarios.map(usuario => ({
    label: usuario.nombre,
    value: usuario.id
  }))
)

function registrarPrestamo() {

  if (!libroSeleccionado.value || !usuarioSeleccionado.value) {
    $q.notify({
      type: 'negative',
      message: 'Debe seleccionar un libro y un usuario.',
      position: 'top'
    })
    return
  }

  const resultado = biblioteca.prestarLibro(
    libroSeleccionado.value,
    usuarioSeleccionado.value
  )

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })

  if (resultado.ok) {
    libroSeleccionado.value = null
    usuarioSeleccionado.value = null
  }
}

function devolver(id) {

  const resultado = biblioteca.devolverLibro(id)

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })
}

function obtenerLibro(id) {
  const libro = biblioteca.libros.find(libro => libro.id === id)
  return libro ? libro.titulo : 'Libro no encontrado'
}

function obtenerUsuario(id) {
  const usuario = biblioteca.usuarios.find(usuario => usuario.id === id)
  return usuario ? usuario.nombre : 'Usuario no encontrado'
}
</script>
