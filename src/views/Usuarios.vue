<template>
  <q-page class="biblioteca-fondo q-pa-md">

    <div class="biblioteca-contenedor">

    <div class="titulo-seccion q-mb-lg">
      👥 Usuarios
    </div>

    <q-card class="q-mb-lg">

      <q-card-section>

        <div class="text-h6 q-mb-md">
          Registrar usuario
        </div>

        <q-input
          v-model="nombre"
          label="Nombre"
          outlined
          class="q-mb-md"
          :rules="[val => !!val || 'El nombre es obligatorio']"
        />

        <q-input
          v-model="documento"
          label="Documento"
          outlined
          class="q-mb-md"
          :rules="[val => !!val || 'El documento es obligatorio']"
        />

        <q-btn
          label="Registrar usuario"
          color="primary"
          @click="registrar"
        />

      </q-card-section>

    </q-card>

    <q-card>

      <q-card-section>
        <div class="text-h6">
          Usuarios registrados
        </div>
      </q-card-section>

      <q-list bordered separator>

        <q-item
          v-for="usuario in biblioteca.usuarios"
          :key="usuario.id"
        >

          <q-item-section>
            <q-item-label>
              {{ usuario.nombre }}
            </q-item-label>

            <q-item-label caption>
              Documento: {{ usuario.documento }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              icon="delete"
              flat
              round
              color="negative"
              @click="eliminar(usuario.id)"
            >
              <q-tooltip>Eliminar usuario</q-tooltip>
            </q-btn>
          </q-item-section>

        </q-item>

        <q-item v-if="biblioteca.usuarios.length === 0">
          <q-item-section>
            No hay usuarios registrados todavía.
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

const nombre = ref('')
const documento = ref('')

function registrar() {

  const resultado = biblioteca.agregarUsuario({
    nombre: nombre.value,
    documento: documento.value
  })

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })

  if (resultado.ok) {
    nombre.value = ''
    documento.value = ''
  }
}

function eliminar(usuarioId) {

  const resultado = biblioteca.eliminarUsuario(usuarioId)

  $q.notify({
    type: resultado.ok ? 'positive' : 'negative',
    message: resultado.mensaje,
    position: 'top'
  })
}
</script>
