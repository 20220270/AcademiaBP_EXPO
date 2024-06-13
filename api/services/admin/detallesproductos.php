<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detallesproductos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalleproducto = new DetalleProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {

                //Niveles de competencia
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search2'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $detalleproducto->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias en una de las secciones';
                }
                break;


                //Categorías de alumnos

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleproducto->setIdProducto($_POST['selectproducto']) or
                    !$detalleproducto->setIdTalla($_POST['selectTalla']) or
                    !$detalleproducto->setIdColor($_POST['selectColor']) or
                    !$detalleproducto->setExistencias($_POST['existenciasProducto'])

                ) {
                    $result['error'] = $detalleproducto->getDataError();
                } elseif ($detalleproducto->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle creado correctamente';
                    // Se asigna el estado del archivo después de insertar.

                } else {
                    $result['error'] = 'Ocurrió un problema al asignar el detalle';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $detalleproducto->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen detalles asignados a productos';
                }
                break;

            case 'readProductosCombobox':
                if ($result['dataset'] = $detalleproducto->readProductosCombobox()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;

            case 'readTallasCombobox':
                if ($result['dataset'] = $detalleproducto->readTallasCombobox()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen tallas registrados';
                }
                break;

            case 'readColoresCombobox':
                if ($result['dataset'] = $detalleproducto->readColoresCombobox()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen colores registrados';
                }
                break;

            case 'readOne':
                if (!$detalleproducto->setIdDetalle($_POST['idDetalleProducto'])) {
                    $result['error'] = $detalleproducto->getDataError();
                } elseif ($result['dataset'] = $detalleproducto->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Detalle inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$detalleproducto->setIdDetalle($_POST['idDetalleProducto']) or
                    !$detalleproducto->setIdProducto($_POST['selectproducto']) or
                    !$detalleproducto->setIdTalla($_POST['selectTalla']) or
                    !$detalleproducto->setIdColor($_POST['selectColor']) or
                    !$detalleproducto->setExistencias($_POST['existenciasProducto'])
                ) {
                    $result['error'] = $detalleproducto->getDataError();
                } elseif ($detalleproducto->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Campos del detalle modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar este detalle';
                }
                break;

            case 'deleteRow':
                if (
                    !$detalleproducto->setIdDetalle($_POST['idDetalleProducto'])
                ) {
                    $result['error'] = $detalleproducto->getDataError();
                } elseif ($detalleproducto->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Detalle eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.

                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este detalle';
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
