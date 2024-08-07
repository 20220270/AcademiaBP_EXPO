<?php
// Se incluye la clase del modelo.
require_once('../../models/data/alumnos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $alumno = new AlumnosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            
            case 'createRowAlumno':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumno->setNombre($_POST['nombreAlumno']) or
                    !$alumno->setApellido($_POST['apellidoAlumno']) or
                    !$alumno->setNacimiento($_POST['fechaNacimiento']) or
                    !$alumno->setPosicion($_POST['selectPosicion']) or
                    !$alumno->setIdDiasPago($_POST['selectDias']) or
                    !$alumno->setFoto($_FILES['fotoAlumno'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->createRowAlumno()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno registrado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES['fotoAlumno'], $alumno::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el alumno';
                }
                
                break;

            case 'readAllDiasPago':
                if ($result['dataset'] = $alumno->readAllDiasPago()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen días y pagos registrados';
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
