import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useBibliotecaStore = defineStore('biblioteca', () => {

  const libros = ref([
    {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'Gabriel García Márquez',
      categoria: 'Literatura',
      copias: 3,
      disponibles: 3
    },
    {
      id: 2,
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      categoria: 'Literatura',
      copias: 2,
      disponibles: 2
    },
    {
      id: 3,
      titulo: 'HTML y CSS',
      autor: 'Jon Duckett',
      categoria: 'Tecnología',
      copias: 2,
      disponibles: 2
    }
  ])

  const usuarios = ref([
    {
      id: 1,
      nombre: 'Ronaldo Rincón',
      documento: '1005123456'
    },
    {
      id: 2,
      nombre: 'Yudith Martínez',
      documento: '6320789456'
    },
    {
      id: 3,
      nombre: 'Esteban Rincon',
      documento: '1101048564'
    }
  ])

  const prestamos = ref([])

  // Contadores incrementales: evitan colisiones de id que Date.now()
  // sí puede producir si dos acciones ocurren en el mismo milisegundo.
  let nextLibroId = Math.max(0, ...libros.value.map(l => l.id)) + 1
  let nextUsuarioId = Math.max(0, ...usuarios.value.map(u => u.id)) + 1
  let nextPrestamoId = 1



  
  function agregarLibro(libro) {

    if (!libro.titulo || !libro.autor || !libro.categoria) {
      return { ok: false, mensaje: 'Título, autor y categoría son obligatorios.' }
    }

    if (!libro.copias || libro.copias < 1) {
      return { ok: false, mensaje: 'El número de copias debe ser mayor a 0.' }
    }

    libros.value.push({
      id: nextLibroId++,
      titulo: libro.titulo,
      autor: libro.autor,
      categoria: libro.categoria,
      copias: libro.copias,
      disponibles: libro.copias
    })

    return { ok: true, mensaje: 'Libro agregado correctamente.' }
  }

  function eliminarLibro(libroId) {

    const libro = libros.value.find(libro => libro.id === libroId)

    if (!libro) {
      return { ok: false, mensaje: 'Libro no encontrado.' }
    }

    if (libro.disponibles !== libro.copias) {
      return { ok: false, mensaje: 'No se puede eliminar: tiene copias prestadas actualmente.' }
    }

    libros.value = libros.value.filter(libro => libro.id !== libroId)

    return { ok: true, mensaje: 'Libro eliminado.' }
  }




  function agregarUsuario(usuario) {

    if (!usuario.nombre || !usuario.documento) {
      return { ok: false, mensaje: 'Nombre y documento son obligatorios.' }
    }

    const yaExiste = usuarios.value.some(
      u => u.documento === usuario.documento
    )

    if (yaExiste) {
      return { ok: false, mensaje: 'Ya existe un usuario registrado con ese documento.' }
    }

    usuarios.value.push({
      id: nextUsuarioId++,
      nombre: usuario.nombre,
      documento: usuario.documento
    })

    return { ok: true, mensaje: 'Usuario registrado correctamente.' }
  }

  function eliminarUsuario(usuarioId) {

    const tienePrestamosActivos = prestamos.value.some(
      p => p.usuarioId === usuarioId && p.estado === 'Prestado'
    )

    if (tienePrestamosActivos) {
      return { ok: false, mensaje: 'No se puede eliminar: el usuario tiene préstamos activos.' }
    }

    usuarios.value = usuarios.value.filter(u => u.id !== usuarioId)

    return { ok: true, mensaje: 'Usuario eliminado.' }
  }




  function prestarLibro(libroId, usuarioId) {

    const libro = libros.value.find(
      libro => libro.id === libroId
    )

    if (!libro) {
      return { ok: false, mensaje: 'Libro no encontrado.' }
    }

    if (libro.disponibles === 0) {
      return { ok: false, mensaje: 'El libro no tiene copias disponibles.' }
    }

    const yaLoTiene = prestamos.value.some(
      p => p.libroId === libroId && p.usuarioId === usuarioId && p.estado === 'Prestado'
    )

    if (yaLoTiene) {
      return { ok: false, mensaje: 'Este usuario ya tiene un ejemplar de este libro prestado.' }
    }

    libro.disponibles--

    prestamos.value.push({
      id: nextPrestamoId++,
      libroId: libroId,
      usuarioId: usuarioId,
      fechaPrestamo: new Date().toLocaleDateString(),
      fechaDevolucion: null,
      estado: 'Prestado'
    })

    return { ok: true, mensaje: 'Préstamo registrado correctamente.' }
  }

  function devolverLibro(prestamoId) {

    const prestamo = prestamos.value.find(
      prestamo => prestamo.id === prestamoId
    )

    if (!prestamo) {
      return { ok: false, mensaje: 'Préstamo no encontrado.' }
    }

    prestamo.estado = 'Devuelto'
    prestamo.fechaDevolucion = new Date().toLocaleDateString()

    const libro = libros.value.find(
      libro => libro.id === prestamo.libroId
    )

    if (libro) {
      libro.disponibles++
    }

    return { ok: true, mensaje: 'Libro devuelto correctamente.' }
  }

  return {
    libros,
    usuarios,
    prestamos,
    agregarLibro,
    eliminarLibro,
    agregarUsuario,
    eliminarUsuario,
    prestarLibro,
    devolverLibro
  }
})
