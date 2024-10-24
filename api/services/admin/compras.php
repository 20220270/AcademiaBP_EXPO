<?php
// Se incluye la clase del modelo.
require_once('../../models/data/compras_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $ordenes = new ComprasData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $ordenes->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $ordenes->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;

            case 'readAll2':
                if ($result['dataset'] = $ordenes->readAll2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;

            case 'readAll3':
                if (!$ordenes->setFecha($_POST['fechaCompra'])) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($result['dataset'] = $ordenes->readAll3()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Compra inexistente';
                }
                break;

            case 'readOne':
                if (!$ordenes->setIdOrden($_POST['idCompra'])) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($result['dataset'] = $ordenes->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Compra inexistente';
                }
                break;

            case 'readDetails':
                if (!$ordenes->setIdOrden($_POST['idCompra'])) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($result['dataset'] = $ordenes->readDetails()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detalle de compra inexistente';
                }
                break;


            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$ordenes->setIdOrden($_POST['idCompra']) or
                    !$ordenes->setEstado($_POST['selectEstadoOrden'])
                ) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($ordenes->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado de la compra modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la compra';
                }
                break;

            case 'deleteRow':
                if (
                    !$ordenes->setIdOrden($_POST['idCompra'])
                ) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($ordenes->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Compra eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la compra';
                }
                break;

            case 'ventasPredictGraph':
                if ($result['dataset'] = $ordenes->ventasPredictGraph()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;
            case 'ventasPredictGraph2':
                if ($result['dataset'] = $ordenes->ventasPredictGraph2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;
            case 'ventasPredictGraph3':
                if ($result['dataset'] = $ordenes->ventasPredictGraph3()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;
            case 'ventasPredictGraph4':
                if ($result['dataset'] = $ordenes->ventasPredictGraph4()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;
            case 'ventasPredictGraph5':
                if ($result['dataset'] = $ordenes->ventasPredictGraph5()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
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
