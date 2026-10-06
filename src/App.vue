<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-white text-black">

      <q-toolbar>

        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="./img/logo-ban.png">
          </q-avatar>
          Biblioteca SENA
        </q-toolbar-title>

      </q-toolbar>

    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      overlay
      behavior="mobile"
      bordered
    >

      <h5 class="titul-menu">
        Menú de Biblioteca:
      </h5>

      <q-btn to="/biblioteca">
        Inicio
        <q-icon class="iconoo" name="📚" />
      </q-btn>
      <br>

      <q-btn to="/catalogo">
        Catálogo
        <q-icon class="iconoo" name="📖" />
      </q-btn>
      <br>

      <q-btn to="/usuarios">
        Usuarios
        <q-icon class="iconoo" name="👥" />
      </q-btn>
      <br>

      <q-btn to="/prestamos">
        Préstamos
        <q-icon class="iconoo" name="📋" />
      </q-btn>
      <br>

      <q-btn to="/historial">
        Historial
        <q-icon class="iconoo" name="📝" />
      </q-btn>
      <br>

    </q-drawer>

    <q-page-container>

      <router-view />

    </q-page-container>

    <q-footer elevated class="bg-white text-black">

      <q-toolbar class="justify-center">

        <q-toolbar-title class="text-center">

          <div class="text-caption">
            © 2026 Biblioteca SENA. Todos los derechos reservados.
          </div>

        </q-toolbar-title>

      </q-toolbar>

    </q-footer>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
body {
  background-color: white;
  margin: 0;
}

.titul-menu {
  color: rgb(40, 206, 25);
  margin: 0;
  text-align: center;
  padding: 10px;
  font-family: 'Times New Roman', Times, serif;
}

.q-drawer .q-btn {
  width: 100%;
  color: #0a0a0a;
  margin: 5px auto;
  justify-content: center;
}

.q-drawer .q-btn__content {
  width: 180px;
  justify-content: flex-start;
  margin: 0 auto 0 70px;
}

.q-toolbar {
  color: rgb(40, 206, 25);
}

.q-footer .q-toolbar {
  color: black;
}

.q-header {
  border-bottom: 3px solid rgb(40, 206, 25);
}

.iconoo {
  width: 30px;
  margin-left: 10px;
}
</style>
