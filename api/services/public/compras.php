<?php
// Se incluye la clase del modelo.
require_once('../../models/data/compras_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pedido = new ComprasData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'error' => null, 'exception' => null, 'dataset' => null);
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {

            case 'searchOrders':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $pedido->searchOrders()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                // Acción para agregar un producto al carrito de compras.
            case 'createDetail':
                $_POST = Validator::validateForm($_POST);
                if (!$pedido->startOrder()) {
                    $result['error'] = 'Ocurrió un problema al iniciar la compra';
                } elseif (

                    !$pedido->setIdDetalle($_POST['idDetalle']) or
                    !$pedido->setCantidad($_POST['cantidadProducto'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->createDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto agregado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al agregar el producto';
                    $result['exception'] = 'Se ha ingresado una cantidad mayor a las existencias disponibles';
                }
                break;
                // Acción para obtener los productos agregados en el carrito de compras.
            case 'readDetail':
                if (!$pedido->getOrder()) {
                    $result['error'] = 'No ha agregado productos al carrito';
                } elseif ($result['dataset'] = $pedido->readDetail()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen productos en el carrito';
                }
                break;


            case 'myOrders':
                if ($result['dataset'] = $pedido->myOrders()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen compras registradas';
                }
                break;

            case 'readMetodosPago':
                if ($result['dataset'] = $pedido->readMetodosPago()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen métodos de pago registrados';
                }
                break;
                // Acción para actualizar la cantidad de un producto en el carrito de compras.
            case 'updateDetail':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pedido->setIdDetalle($_POST['idDetalle']) or
                    !$pedido->setCantidad($_POST['cantidadProducto'])
                ) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->updateDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cantidad modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la cantidad';
                }
                break;
                // Acción para remover un producto del carrito de compras.
            case 'deleteDetail':
                if (!$pedido->setIdDetalle($_POST['idDetalle'])) {
                    $result['error'] = $pedido->getDataError();
                } elseif ($pedido->deleteDetail()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto removido correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al remover el producto';
                }
                break;
                // Acción para finalizar el carrito de compras.
                case 'finishOrder':
                    $_POST = Validator::validateForm($_POST); // Validar los datos de entrada
                
                    // Verificar que se puedan establecer los métodos de pago e información de pago
                    if (
                        !$pedido->setIdMetodo($_POST['idMetodoPago']) || 
                        !$pedido->setInformacion($_POST['datosPago'])
                    ) {
                        $result['error'] = $pedido->getDataError(); // Obtener el error si no se pueden establecer
                    } elseif ($pedido->finishOrder()) { // Llamar al método para finalizar la orden
                        $result['status'] = 1; // Indicar éxito
                        $result['message'] = 'Compra finalizada correctamente'; // Mensaje de éxito
                    } else {
                        $result['error'] = 'Ocurrió un problema al finalizar la compra'; // Mensaje de error
                    }
                    break;
                
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando un cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createDetail':
                $result['error'] = 'Debe iniciar sesión para agregar el producto al carrito';
                break;
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
