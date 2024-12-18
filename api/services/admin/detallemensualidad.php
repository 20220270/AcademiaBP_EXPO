<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detallemensualidad_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detallemensualidad = new DetallePagosMensualidadData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search3'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $detallemensualidad->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detallemensualidad->setIdPago($_POST['idPagoRealizado']) or
                    !$detallemensualidad->setDescripcion($_POST['descripcionPago'])
                ) {
                    $result['error'] = $detallemensualidad->getDataError();
                } elseif ($detallemensualidad->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pago registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar este detalle';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $detallemensualidad->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
                }
                break;


            case 'readAllRecientes':
                if ($result['dataset'] = $detallemensualidad->readAllRecientes()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
                }
                break;
            case 'readAllPagadas':
                if ($result['dataset'] = $detallemensualidad->readAllPagadas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
                }
                break;
            case 'readAllNoPagadas':
                if ($result['dataset'] = $detallemensualidad->readAllNoPagadas()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
                }
                break;

            case 'readAllFecha':
                if (!$detallemensualidad->setFechaProximoPago($_POST['fechaProximoPago'])) {
                    $result['error'] = $detallemensualidad->getDataError();
                } elseif ($result['dataset'] = $detallemensualidad->readAllFecha()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detalle de pago inexistente';
                }
                break;


            case 'readOne':
                if (!$detallemensualidad->setIdDetalle($_POST['idDetallePagoMensualidad'])) {
                    $result['error'] = $detallemensualidad->getDataError();
                } elseif ($result['dataset'] = $detallemensualidad->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detalle de pago inexistente';
                }
                break;


            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detallemensualidad->setIdDetalle($_POST['idDetallePagoMensualidad']) or
                    !$detallemensualidad->setIdPago($_POST['idPagoRealizado']) or
                    !$detallemensualidad->setDescripcion($_POST['descripcionPago']) or
                    !$detallemensualidad->setFechaProximoPago($_POST['proximoPago'])
                ) {
                    $result['error'] = $detallemensualidad->getDataError();
                } elseif ($detallemensualidad->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pago modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el detalle';
                }
                break;
            case 'deleteRow':
                if (
                    !$detallemensualidad->setIdDetalle($_POST['idDetallePagoMensualidad'])
                ) {
                    $result['error'] = $detallemensualidad->getDataError();
                } elseif ($detallemensualidad->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle de pago eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar a este detalle';
                }
                break;
            case 'readAllPagos':
                if ($result['dataset'] = $detallemensualidad->readAllPagos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
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
