<?php
// Se incluye la clase del modelo.
require_once('../../models/data/staff_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $staff = new StaffData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $staff->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$staff->setNombre($_POST['nombreStaff']) or
                    !$staff->setApellido($_POST['apellidoStaff']) or
                    !$staff->setDescripcion($_POST['descripcionStaff']) or
                    !$staff->setImagen($_FILES['imagenStaff'])
                ) {
                    $result['error'] = $staff->getDataError();
                } elseif ($staff->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Staff agregado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenStaff'], $staff::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el staff';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $staff->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen miembros de staff registrados';
                }
                break;
            case 'readOne':
                if (!$staff->setId($_POST['idStaff'])) {
                    $result['error'] = $staff->getDataError();
                } elseif ($result['dataset'] = $staff->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Dato inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$staff->setId($_POST['idStaff']) or
                    !$staff->setFilename() or
                    !$staff->setNombre($_POST['nombreStaff']) or
                    !$staff->setApellido($_POST['apellidoStaff']) or
                    !$staff->setDescripcion($_POST['descripcionStaff']) or
                    !$staff->setImagen($_FILES['imagenStaff'], $staff->getFilename())
                ) {
                    $result['error'] = $staff->getDataError();
                } elseif ($staff->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Campo del staff modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenStaff'], $staff::RUTA_IMAGEN, $staff->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el staff';
                }
                break;
            case 'deleteRow':
                if (
                    !$staff->setId($_POST['idStaff']) or
                    !$staff->setFilename()
                ) {
                    $result['error'] = $staff->getDataError();
                } elseif ($staff->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Staff eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($staff::RUTA_IMAGEN, $staff->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este staff';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
