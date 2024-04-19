// Función para cambiar el estado del comentario
function cambiarEstadoComentario(event) {
    // Seleccionar el elemento clicado
    var comentario = event.target;
    
    // Verificar si el elemento clicado tiene la clase 'inactivo'
    if (comentario.classList.contains('inactivo')) {
        // Cambiar el texto del elemento a 'Activo'
        comentario.textContent = 'Activo';
        // Cambiar la clase a 'activo'
        comentario.classList.remove('inactivo');
        comentario.classList.add('activo');
    } else {
        // Cambiar el texto del elemento a 'Inactivo'
        comentario.textContent = 'Inactivo';
        // Cambiar la clase a 'inactivo'
        comentario.classList.remove('activo');
        comentario.classList.add('inactivo');
    }
}

// Seleccionar todos los elementos con la clase 'comentario'
var comentarios = document.querySelectorAll('.comentario');

// Agregar un evento de clic a cada uno de los elementos seleccionados
comentarios.forEach(function(comentario) {
    comentario.addEventListener('click', cambiarEstadoComentario);
});
