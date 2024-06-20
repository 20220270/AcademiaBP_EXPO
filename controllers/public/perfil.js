

// Constantes para establecer los elementos del formulario de editar perfil.
const PROFILE_FORM = document.getElementById('profileForm'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    DUI_CLIENTE = document.getElementById('duiCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    TELEFONO_CLIENTE = document.getElementById('telefonoCliente'),
    DIRECCION_CLIENTE = document.getElementById('direccionCliente'),
    FECHA_REGISTRO = document.getElementById('fecharegistroCliente'),
    FOTO_CLIENTE = document.getElementById('imagen');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate(); // Cargar encabezado y pie de página si es necesario
    const DATA = await fetchData(USER_API, 'readProfile');
    if (DATA.status) {
        const ROW = DATA.dataset;
        // Asignar los valores a los campos de entrada
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        DUI_CLIENTE.value = ROW.dui_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
        FECHA_REGISTRO.value = ROW.fecha_registro;
       DIRECCION_CLIENTE.value = ROW.direccion_cliente;
        
        FOTO_CLIENTE.src = `${SERVER_URL}images/clientes/${ROW.foto_cliente}`; //Mandamos a llamar la foto del cliente
    } else {
        sweetAlert(2, DATA.error, null);
    }
});

const fotoInput = document.getElementById('fotoInput');
// Escuchar cambios en el elemento de entrada de archivo
fotoInput.addEventListener('change', function() {
    // Verificar si se seleccionó un archivo
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Mostrar la imagen cargada en el elemento de imagen
            const imagen = document.getElementById('imagen');
            imagen.src = e.target.result;
        };
        // Leer el archivo como una URL de datos
        reader.readAsDataURL(this.files[0]);
    }else{
        FOTO_CLIENTE.src = `${SERVER_URL}images/clientes/${ROW.foto_cliente}`; //Mandamos a llamar la foto del administrador
    }
});




// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false); //
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.show();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}

//popup del boton para actualizar datos
document.getElementById('botonActualizarDatos').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Editar datos',
        content: 'Haz clic aquí para editar o guardar tus datos. La contraseña no puedes editarla aquí',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonActualizarDatos').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//popup del boton para actualizar la contraseña
document.getElementById('botonActualizarContrasena').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Editar contraseña',
        content: 'Haz clic aquí para editar tu contraseña.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonActualizarContrasena').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});


//popup del boton para cerrar ventana - imagen de comentarios
document.getElementById('botonCerrarCon').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en nuestro logo para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCon').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//popup del boton para cerrar ventana - logo de La Academia
document.getElementById('botonCerrarCon2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCon2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});


//Barra de busqueda de productos
const buscadorInput = document.getElementById('Buscador1');

buscadorInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = buscadorInput.value.trim();
        if (searchTerm !== '') {
            // Guardar el término de búsqueda en el almacenamiento local
            localStorage.setItem('lastSearchTerm', searchTerm);
            
            // Redirigir a la página de categorías con el término de búsqueda
            window.location.href = `categorias_productos.html`;
        }
    }
});