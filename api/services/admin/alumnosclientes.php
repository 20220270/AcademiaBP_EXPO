<?php
// Se incluye la clase del modelo.
require_once('../../models/data/alumnosclientes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $alumnocliente = new AlumnoClientesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search2'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $alumnocliente->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumnocliente->setIdCliente($_POST['idCliente']) or
                    !$alumnocliente->setIdAlumno($_POST['idAlumnoAsignar'])
                ) {
                    $result['error'] = $alumnocliente->getDataError();
                } elseif ($alumnocliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos asignados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al asignar datos';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $alumnocliente->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readOne':
                if (!$alumnocliente->setIdAlumnoCliente($_POST['idAlumnoCliente'])) {
                    $result['error'] = $alumnocliente->getDataError();
                } elseif ($result['dataset'] = $alumnocliente->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Dato inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumnocliente->setIdAlumnoCliente($_POST['idAlumnoCliente']) or
                    !$alumnocliente->setIdCliente($_POST['idCliente']) or
                    !$alumnocliente->setIdAlumno($_POST['idAlumnoAsignar'])
                ) {
                    $result['error'] = $alumnocliente->getDataError();
                } elseif ($alumnocliente->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dato modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el dato';
                }
                break;
            case 'deleteRow':
                if (
                    !$alumnocliente->setIdAlumnoCliente($_POST['idAlumnoCliente'])
                ) {
                    $result['error'] = $alumnocliente->getDataError();
                } elseif ($alumnocliente->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dato eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el dato';
                }
                break;
            case 'readAllAlumnos':
                if ($result['dataset'] = $alumnocliente->readAllAlumnos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readAllClientes':
                if ($result['dataset'] = $alumnocliente->readAllClientes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
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
