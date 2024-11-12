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

            case 'startOrder2':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$ordenes->setIdAlumno($_POST['idAlumno'])
                ) {
                    $result['error'] = $ordenes->getDataError();
                } else {
                    try {
                        if ($ordenes->startOrder2()) {
                            $result['status'] = 1;
                            $result['message'] = 'Compra iniciado con éxito';
                        } else {
                            $result['error'] = 'No se pudo iniciar la compra';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al registrar la compra: ' . $e->getMessage();
                    }
                }
                break;

            case 'createDetail2':
                $_POST = Validator::validateForm($_POST);
                if (

                    !$ordenes->setIdDetalle($_POST['idDetalleSelect']) or
                    !$ordenes->setCantidad($_POST['cantidadProducto']) or
                    !$ordenes->setPersonalizacion($_POST['datosPersonalizacion']) or
                    !$ordenes->setIdOrden($_POST['idCompraSelect'])
                ) {
                    $result['error'] = $ordenes->getDataError();
                } elseif ($ordenes->createDetail2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al agregar el producto';
                    $result['exception'] = 'Se ha ingresado una cantidad mayor a las existencias disponibles';
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
                
            case 'readCompras':
                if ($result['dataset'] = $ordenes->readCompras()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;

            case 'finishOrder2':
                $_POST = Validator::validateForm($_POST); // Validar los datos de entrada

                // Verificar que se puedan establecer los métodos de pago e información de pago
                if (
                    !$ordenes->setIdOrden($_POST['idPago']) ||
                    !$ordenes->setIdMetodo($_POST['idMetodoPago']) ||
                    !$ordenes->setInformacion($_POST['datosPago'])
                ) {
                    $result['error'] = $ordenes->getDataError(); // Obtener el error si no se pueden establecer
                } elseif ($ordenes->finishOrder2()) { // Llamar al método para finalizar la orden
                    $result['status'] = 1; // Indicar éxito
                    $result['message'] = 'Compra finalizada correctamente'; // Mensaje de éxito
                } else {
                    $result['error'] = 'Ocurrió un problema al finalizar la compra'; // Mensaje de error
                }
                break;

            case 'readAllCompraNueva':
                if ($result['dataset'] = $ordenes->readAllCompraNueva()) {
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
