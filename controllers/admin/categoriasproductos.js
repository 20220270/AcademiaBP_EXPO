


function updateColorHex(color) {
    // Convertir el color seleccionado a formato hexadecimal
    var colorHex = color.substring(1); // Eliminar el símbolo '#' al inicio
    // Asignar el valor hexadecimal al input oculto
    document.getElementById("colorHex").value = colorHex;
}


document.addEventListener('DOMContentLoaded', () => {
  // Llamada a la función para mostrar el encabezado y pie del documento.
  loadTemplate();
  // Se establece el título del contenido principal.
  //MAIN_TITLE.textContent = 'Gestionar categorías';
  // Llamada a la función para llenar la tabla con los registros existentes.
  //fillTable();
});