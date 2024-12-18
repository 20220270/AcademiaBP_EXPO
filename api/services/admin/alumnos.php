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
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $alumno->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);

                // Validar edad del alumno
                $fechaNacimiento = $_POST['fechaNacimiento'];
                $fechaActual = new DateTime();
                $fechaNacimiento = new DateTime($fechaNacimiento);
                $edad = $fechaNacimiento->diff($fechaActual)->y;

                if ($edad < 2) {
                    $result['error'] = 'El alumno no puede ser menor a dos años';
                } else {
                    try {
                        if (
                            !$alumno->setNombre($_POST['nombreAlumno']) ||
                            !$alumno->setApellido($_POST['apellidoAlumno']) ||
                            !$alumno->setNacimiento($_POST['fechaNacimiento']) ||
                            !$alumno->setPosicion($_POST['selectPosicion']) ||
                            !$alumno->setIdDiasPago($_POST['selectDias']) ||
                            !$alumno->setIdCliente($_POST['selectEncargado']) ||
                            !$alumno->setFoto($_FILES['fotoAlumno'])
                        ) {
                            $result['error'] = $alumno->getDataError();
                        } elseif ($alumno->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Alumno registrado correctamente';
                            $result['fileStatus'] = Validator::saveFile($_FILES['fotoAlumno'], $alumno::RUTA_IMAGEN);
                        } else {
                            $result['error'] = 'Ocurrió un problema al registrar el alumno';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al registrar el alumno: ' . $e->getMessage();
                    }
                }
                break;



            case 'readAll':
                if ($result['dataset'] = $alumno->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosRecientes':
                if ($result['dataset'] = $alumno->readAllAlumnosRecientes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosAntiguos':
                if ($result['dataset'] = $alumno->readAllAlumnosAntiguos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosMayorEdad':
                if ($result['dataset'] = $alumno->readAllAlumnosMayorEdad()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosMenorEdad':
                if ($result['dataset'] = $alumno->readAllAlumnosMenorEdad()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosMasDias':
                if ($result['dataset'] = $alumno->readAllAlumnosMasDias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosMenosDias':
                if ($result['dataset'] = $alumno->readAllAlumnosMenosDias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosJugadoresCampo':
                if ($result['dataset'] = $alumno->readAllAlumnosJugadoresCampo()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readAllAlumnosPorteros':
                if ($result['dataset'] = $alumno->readAllAlumnosPorteros()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;


            case 'readOne':
                if (!$alumno->setId($_POST['idAlumno'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($result['dataset'] = $alumno->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;

            case 'readDatosAlumno':
                if (!$alumno->setId($_POST['idAlumno'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($result['dataset'] = $alumno->readDatosAlumno()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;



            case 'readDatosAlumnosCategorias':
                if (!$alumno->setId($_POST['idAlumno'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($result['dataset'] = $alumno->readDatosAlumnosCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);

                // Validar edad del alumno
                $fechaNacimiento = $_POST['fechaNacimiento'];
                $fechaActual = new DateTime();
                $fechaNacimiento = new DateTime($fechaNacimiento);
                $edad = $fechaNacimiento->diff($fechaActual)->y;

                if ($edad < 2) {
                    $result['error'] = 'El alumno no puede ser menor a dos años';
                } else {
                    try {
                        if (
                            !$alumno->setId($_POST['idAlumno']) ||
                            !$alumno->setFilename() ||
                            !$alumno->setNombre($_POST['nombreAlumno']) ||
                            !$alumno->setApellido($_POST['apellidoAlumno']) ||
                            !$alumno->setNacimiento($_POST['fechaNacimiento']) ||
                            !$alumno->setPosicion($_POST['selectPosicion']) ||
                            !$alumno->setIdDiasPago($_POST['selectDias']) ||
                            !$alumno->setEstado($_POST['selectEstado']) ||
                            !$alumno->setFechaInscripcion($_POST['fechaInscripcion']) ||
                            !$alumno->setIdCliente($_POST['selectEncargado']) ||
                            !$alumno->setFoto($_FILES['fotoAlumno'], $alumno->getFilename())
                        ) {
                            $result['error'] = $alumno->getDataError();
                        } elseif ($alumno->updateRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Alumno modificado correctamente';
                            $result['fileStatus'] = Validator::changeFile($_FILES['fotoAlumno'], $alumno::RUTA_IMAGEN, $alumno->getFilename());
                        } else {
                            $result['error'] = 'Ocurrió un problema al modificar datos del alumno';
                        }
                    } catch (Exception $e) {
                        if (strpos($e->getMessage(), 'TLa fecha de nacimiento del alumno indica que debe tener al menos dos años de edad.') !== false) {
                            $result['error'] = 'El alumno no puede ser menor a dos años';
                        } else {
                            $result['error'] = 'Error al modificar datos del alumno: ' . $e->getMessage();
                        }
                    }
                }
                break;

            case 'deleteRow':
                if (
                    !$alumno->setId($_POST['idAlumno'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el alumno';
                }
                break;

            case 'readAllStaffCategorias':
                if ($result['dataset'] = $alumno->readAllStaffCategorias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorias y staff registrados';
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

            case 'readAllDiasPago2':
                if ($result['dataset'] = $alumno->readAllDiasPago2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen días y pagos registrados';
                }
                break;

            case 'categoriasConMasAlumnos':
                if ($result['dataset'] = $alumno->categoriasConMasAlumnos()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;

            case 'alumnosPredictGraph':
                if ($result['dataset'] = $alumno->alumnosPredictGraph()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;

            case 'alumnosPredictGraph2':
                if ($result['dataset'] = $alumno->alumnosPredictGraph2()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;

            case 'alumnosPredictGraph3':
                if ($result['dataset'] = $alumno->alumnosPredictGraph3()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;

            case 'createRowAlumnosCategorias':
                $_POST = Validator::validateForm($_POST);

                if (
                    !$alumno->setId($_POST['selectAlumno']) ||
                    !$alumno->setIdStaffCategoria($_POST['selectCategoriaa'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->createRowAlumnosCategorias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Asignación registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la asignación';
                }
                break;

            case 'updateRowAlumnosCategorias':
                $_POST = Validator::validateForm($_POST);

                if (
                    !$alumno->setIdAlumnosCategoria($_POST['idAlumnoCategoria']) ||
                    !$alumno->setId($_POST['selectAlumno']) ||
                    !$alumno->setIdStaffCategoria($_POST['selectCategoriaa'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->updateRowAlumnosCategorias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar datos del alumno';
                }
                break;

            case 'deleteRowAlumnosCategorias':
                if (
                    !$alumno->setIdAlumnosCategoria($_POST['idAlumnoCategoria'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->deleteRowAlumnosCategorias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Asignación eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la asignación';
                }
                break;

            case 'readOneAlumnosCategorias':
                if (!$alumno->setIdAlumnosCategoria($_POST['idAlumnoCategoria'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($result['dataset'] = $alumno->readOneAlumnosCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;

            case 'readComboStaffCategorias':
                if ($result['dataset'] = $alumno->readComboStaffCategorias()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
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
