<template>
  <q-page class="biblioteca-fondo q-pa-md">

    <div class="biblioteca-contenedor">

      <q-card flat class="q-mb-md overflow-hidden rounded-borders shadow-2">

        <q-img
          src="../img/biblio.png"
          height="500px"
          fit="cover"
        >

          <div class="absolute-top text-center titulo-banner">
            Biblioteca SENA
          </div>

        </q-img>

      </q-card>

      <div class="row q-col-gutter-md q-mb-md">

        <div class="col-12 col-md-3">
          <q-card class="card-general shadow-2">
            <q-card-section>
              <div class="titulo-seccion">📚 Libros</div>
              <div class="text-h4 text-green">
                {{ biblioteca.libros.length }}
              </div>
              <div>Libros registrados</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="card-general shadow-2">
            <q-card-section>
              <div class="titulo-seccion">📖 Disponibles</div>
              <div class="text-h4 text-green">
                {{ librosDisponibles }}
              </div>
              <div>Copias disponibles</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="card-general shadow-2">
            <q-card-section>
              <div class="titulo-seccion">👥 Usuarios</div>
              <div class="text-h4 text-green">
                {{ biblioteca.usuarios.length }}
              </div>
              <div>Usuarios registrados</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-3">
          <q-card class="card-general shadow-2">
            <q-card-section>
              <div class="titulo-seccion">📋 Préstamos</div>
              <div class="text-h4 text-green">
                {{ prestamosActivos }}
              </div>
              <div>Préstamos activos</div>
            </q-card-section>
          </q-card>
        </div>

      </div>

      <q-card class="card-general shadow-2 q-mb-md">

        <div class="titulo-seccion-a">
          📚 Información de la biblioteca
        </div>

        <q-card-section class="q-pa-lg">

          <p class="texto-descripcion">
            La biblioteca del SENA es un espacio donde los aprendices
            pueden consultar libros y recursos para apoyar su formación.
            Desde este sistema se pueden registrar libros, usuarios,
            préstamos y devoluciones.
          </p>

        </q-card-section>

      </q-card>

      <q-card class="card-general shadow-2 q-mb-md">

        <div class="titulo-seccion-a">
          📖 Libros registrados
        </div>

        <q-list bordered separator>

          <q-item
            v-for="libro in biblioteca.libros"
            :key="libro.id"
          >

            <q-item-section>

              <q-item-label>
                {{ libro.titulo }}
              </q-item-label>

              <q-item-label caption>
                Autor: {{ libro.autor }}
              </q-item-label>

              <q-item-label caption>
                Categoría: {{ libro.categoria }}
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-item-label>
                {{ libro.disponibles }} disponibles
              </q-item-label>
            </q-item-section>

          </q-item>

          <q-item v-if="biblioteca.libros.length === 0">
            <q-item-section>
              No hay libros registrados.
            </q-item-section>
          </q-item>

        </q-list>

      </q-card>

    </div>

  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useBibliotecaStore } from '../stores/biblioteca.js'

const biblioteca = useBibliotecaStore()

const librosDisponibles = computed(() => {
  return biblioteca.libros.reduce(
    (total, libro) => total + libro.disponibles,
    0
  )
})

const prestamosActivos = computed(() => {
  return biblioteca.prestamos.filter(
    prestamo => prestamo.estado === 'Prestado'
  ).length
})
</script>
