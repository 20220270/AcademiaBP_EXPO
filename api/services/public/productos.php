<?php
// Se incluye la clase del modelo.
require_once('../../models/data/productos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se instancia la clase correspondiente.
    $producto = new ProductoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    // Se compara la acción a realizar según la petición del controlador.
    switch ($_GET['action']) {
        case 'readProductosCategorias':
            if (!$producto->setCategoria($_POST['idCategoria']) ) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readProductosCategorias()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No existen productos para mostrar';
            }
            break;

            case 'readProductosCategoria':
                if (!$producto->setCategoria($_POST['idCategoria']) or !$producto->setId($_POST['idProducto'])) {
                    $result['error'] = $producto->getDataError();
                } elseif ($result['dataset'] = $producto->readProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No existen productos para mostrar';
                }
                break;

        case 'readOnee':
            if (!$producto->setIdDeta($_POST['idDetalle'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->readOnee()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Producto inexistente';
            }
            break;
            case 'productosMasVendi2':
                if ($result['dataset'] = $producto->productosMasVendi2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;

        case 'commentsProduct':
            if (!$producto->setId($_POST['idProducto'])) {
                $result['error'] = $producto->getDataError();
            } elseif ($result['dataset'] = $producto->commentsProduct()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No hay comentarios ';
            }
            break;
            
        default:
            $result['error'] = 'Acción no disponible';
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
