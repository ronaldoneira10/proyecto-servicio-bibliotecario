<template>
  <q-page class="biblioteca-fondo q-pa-md">

    <div class="biblioteca-contenedor">

    <div class="titulo-seccion q-mb-lg">
      📖 Catálogo de libros
    </div>

    <q-card class="q-mb-lg">

      <q-card-section>

        <div class="text-h6 q-mb-md">
          Agregar libro
        </div>

        <q-input
          v-model="titulo"
          label="Título"
          outlined
          class="q-mb-md"
          :rules="[val => !!val || 'El título es obligatorio']"
        />

        <q-input
          v-model="autor"
          label="Autor"
          outlined
          class="q-mb-md"
          :rules="[val => !!val || 'El autor es obligatorio']"
        />

        <q-input
          v-model="categoria"
          label="Categoría"
          outlined
          class="q-mb-md"
          :rules="[val => !!val || 'La categoría es obligatoria']"
        />

        <q-input
          v-model.number="copias"
          type="number"
          label="Número de copias"
     
        />

        <q-btn
          label="Agregar libro"
          color="primary"
          @click="agregar"
        />

      </q-card-section>

    </q-card>

    <q-card>

      <q-card-section>
        <div class="text-h6">
          Libros registrados
        </div>
      </q-card-section>

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

            <q-item-label caption>
              Copias disponibles:
              {{ libro.disponibles }} / {{ libro.copias }}
            </q-item-label>

          </q-item-section>

          <q-item-section side>
            <q-btn
              icon="delete"
              flat
              round
              color="negative"
              @click="eliminar(libro.id)"
            >
              <q-tooltip>Eliminar libro</q-tooltip>
            </q-btn>
          </q-item-section>

        </q-item>

        <q-item v-if="biblioteca.libros.length === 0">
          <q-item-section>
            No hay libros registrados todavía.
          </q-item-section>
        </q-item>

      </q-list>

    </q-card>

      </div>

</q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useBibliotecaStore } from '../stores/biblioteca.js'

const biblioteca = useBibliotecaStore()
const $q = useQuasar()

const titulo = ref('')
const autor = ref('')
const categoria = ref('')
const copias = ref(1)

function agregar() {

  const resultado = biblioteca.agregarLibro({
    titulo: titulo.value,
    autor: autor.value,
    categoria: categoria.value,
    copias: copias.value
  })

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })

  if (resultado.ok) {
    titulo.value = ''
    autor.value = ''
    categoria.value = ''
    copias.value = 1
  }
}

function eliminar(libroId) {

  const resultado = biblioteca.eliminarLibro(libroId)

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })
}
</script>
