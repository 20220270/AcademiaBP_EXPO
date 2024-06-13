<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categoriastaff_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoriastaff = new CategoriaStaffData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search2'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $categoriastaff->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoriastaff->setIdStaff($_POST['idStaffAsignar']) or
                    !$categoriastaff->setidCategorias($_POST['idCategoriaAsignar'])
                ) {
                    $result['error'] = $categoriastaff->getDataError();
                } elseif ($categoriastaff->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos asignados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al asignar datos';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $categoriastaff->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readOne':
                if (!$categoriastaff->setIdStaffCategoria($_POST['idStaffCategoria'])) {
                    $result['error'] = $categoriastaff->getDataError();
                } elseif ($result['dataset'] = $categoriastaff->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Dato inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoriastaff->setIdStaffCategoria($_POST['idStaffCategoria']) or
                    !$categoriastaff->setIdStaff($_POST['idStaffAsignar']) or
                    !$categoriastaff->setidCategorias($_POST['idCategoriaAsignar'])
                ) {
                    $result['error'] = $categoriastaff->getDataError();
                } elseif ($categoriastaff->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dato modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el dato';
                }
                break;
            case 'deleteRow':
                if (
                    !$categoriastaff->setIdStaffCategoria($_POST['idStaffCategoria'])
                ) {
                    $result['error'] = $categoriastaff->getDataError();
                } elseif ($categoriastaff->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dato eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el dato';
                }
                break;
            case 'readAllStaffs':
                if ($result['dataset'] = $categoriastaff->readAllStaffs()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readAllCategorias':
                if ($result['dataset'] = $categoriastaff->readAllCategorias()) {
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
