

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
    IDNIVEL = document.getElementById('idAdmin');
// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');

const NOTIFICACIONES_FORM = document.getElementById('notificacionesForm');
const NOTIFICACIONES_API = 'services/admin/notificacion.php';
CARD_NOTIFICACIONES = document.getElementById('notificaciones');

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
        IDNIVEL.value = ROW.id_nivel;
        FOTO_ADMINISTRADOR.src = `${SERVER_URL}images/administradores/${ROW.foto_administrador}`; //Mandamos a llamar la foto del administrador
    } else {
        sweetAlert(2, DATA.error, null);
    }
    fillTable();
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

const fillTable = async (form = null) => {
    CARD_NOTIFICACIONES.innerHTML = '';
    const action = (form) ? 'searchRows' : 'readAll';

    // Crear un nuevo objeto FormData
    const formData = new FormData();

    // Agregar el idAdmin a FormData si es necesario
    formData.append('idAdmin', IDNIVEL.value); // Captura el valor del nivel de administrador

    // Usar formData como el cuerpo de la solicitud
    const DATA = await fetchData(NOTIFICACIONES_API, action, form ? form : formData);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            // Definir el color del borde izquierdo según el tipo de notificación
            const borderColor = 
                row.tipo_notificacion === 'Nueva inscripción' ? 'blue' :
                row.tipo_notificacion === 'Dato agregado' ? 'red' :
                row.tipo_notificacion === 'Compra realizada' ? 'green' :
                row.tipo_notificacion === 'Valoración realizada' ? 'orange' :
                row.tipo_notificacion === 'Pago realizado' ? 'yellow' :
                'gray'; // Color por defecto

            CARD_NOTIFICACIONES.innerHTML += `
        <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-4 mt-5 text-center">
          <div class="card h-100" id="cards" title="${row.tipo_notificacion}" style="border-left: 5px solid ${borderColor};"> <!-- Estilo de borde izquierdo -->
            <div class="card-body">
              <div class="status-circle ${row.tipo_notificacion === 'Nueva inscripción' ? 'nuevainscripción' : 
                  row.tipo_notificacion === 'Dato agregado' ? 'datoagregado' :  
                  row.tipo_notificacion === 'Compra realizada' ? 'comprarealizada' : 
                  row.tipo_notificacion === 'Valoración realizada' ? 'valoracionrealizada' : 
                  'erroneo'}" title="Tipo de notificación: ${row.tipo_notificacion}"></div>

              <h5 class="card-title">${row.titulo}</h5>
              <p>${row.mensaje}</p>
              <div class="d-flex justify-content-center gap-2">
                  <button type="button" class="btn mt-1 btn1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_notificacion})">
                      <i class="bi bi-search"></i>
                      <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                  </button>
              </div>
            </div>
          </div>
        </div>
      `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}



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

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar esta notificación de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idNotificacion', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(NOTIFICACIONES_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


