

// Constantes para establecer los elementos del formulario de editar perfil.
const PROFILE_FORM = document.getElementById('profileForm'),
    NOMBRE_ADMINISTRADOR = document.getElementById('nombreAdministrador'),
    APELLIDO_ADMINISTRADOR = document.getElementById('apellidoAdministrador'),
    DUI_ADMINISTRADOR = document.getElementById('duiAdministrador'),
    CORREO_ADMINISTRADOR = document.getElementById('correoAdministrador'),
    TELEFONO_ADMINISTRADOR = document.getElementById('telefonoAdministrador'),
    NIVEL_ADMINISTRADOR = document.getElementById('nivelAdministrador'),
    FECHA_REGISTRO = document.getElementById('fecharegistroAdmin'),
    ALIAS_ADMINISTRADOR = document.getElementById('aliasAdministrador');
    ULTIMA_CONECCION = document.getElementById('ultimaConeccion');
    FOTO_ADMINISTRADOR = document.getElementById('imagen');
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
        NOMBRE_ADMINISTRADOR.value = ROW.nombre_admistrador;
        APELLIDO_ADMINISTRADOR.value = ROW.apellido_administrador;
        DUI_ADMINISTRADOR.value = ROW.dui_administrador;
        CORREO_ADMINISTRADOR.value = ROW.correo_administrador;
        TELEFONO_ADMINISTRADOR.value = ROW.telefono_administrador;
        FECHA_REGISTRO.value = ROW.fecha_registro;
        NIVEL_ADMINISTRADOR.value = ROW.nivel;
        ALIAS_ADMINISTRADOR.value = ROW.alias_administrador;
        ULTIMA_CONECCION.value = ROW.ultima_sesion;
        FOTO_ADMINISTRADOR.src = `${SERVER_URL}images/administradores/${ROW.foto_administrador}`; //Mandamos a llamar la foto del administrador
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
        FOTO_ADMINISTRADOR.src = `${SERVER_URL}images/administradores/userIcon.png`; //Mandamos a llamar la foto del administrador
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


