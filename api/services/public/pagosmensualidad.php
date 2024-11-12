<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pagosmensualidad_data.php');
require_once('../../models/data/metodospagos_data.php');
// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pagos = new PagosMensualidadData;
    $metodospagos = new MetodosPagosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (

                    !$pagos->setIdAlumnoCliente($_POST['SelectDatosPago']) or
                    !$pagos->setIdMetodo($_POST['idMetodoPago']) ||
                    !$pagos->setInformacion($_POST['datosPago'])
                ) {
                    $result['error'] = $pagos->getDataError();
                } elseif ($pagos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pago registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el pago';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $metodospagos->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen métodos de pago registrados';
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
