<?php
// Se incluye la clase del modelo.
require_once('../../models/data/entrenamiento_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $entrenamiento = new EntrenamientoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
                //Sección de horarios
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $entrenamiento->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                
            case 'createRowHorarios':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$entrenamiento->setDia($_POST['selectDia']) or
                    !$entrenamiento->setHoraInicio($_POST['horainicio']) or
                    !$entrenamiento->setHoraFinalizacion($_POST['horafinalizacion'])
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->createRowHorarios()) {
                    $result['status'] = 1;
                    $result['message'] = 'Horario registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el Horario';
                }
                break;
            case 'readAllHorarios':
                if ($result['dataset'] = $entrenamiento->readAllHorarios()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen horarios registrados';
                }
                break;

                case 'readAllHorariosCombo':
                    if ($result['dataset'] = $entrenamiento->readAllHorariosCombo()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen horarios registrados';
                    }
                    break;

            case 'readOneHorarios':
                if (!$entrenamiento->setIdHorario($_POST['idHorario'])) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($result['dataset'] = $entrenamiento->readOneHorarios()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Horario inexistente';
                }
                break;
            case 'updateRowHorarios':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$entrenamiento->setIdHorario($_POST['idHorario']) or
                    !$entrenamiento->setDia($_POST['selectDia']) or
                    !$entrenamiento->setHoraInicio($_POST['horainicio']) or
                    !$entrenamiento->setHoraFinalizacion($_POST['horafinalizacion'])
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->updateRowHorarios()) {
                    $result['status'] = 1;
                    $result['message'] = 'Horario modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar este horario';
                }
                break;
            case 'deleteRowHorarios':
                if (
                    !$entrenamiento->setIdHorario($_POST['idHorario'])
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->deleteRowHorarios()) {
                    $result['status'] = 1;
                    $result['message'] = 'Horario eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este horario';
                }
                break;




                //Sección de lugares
            case 'createRowLugares':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$entrenamiento->setNombreLugar($_POST['nombreLugar']) or
                    !$entrenamiento->setImagenLugar($_FILES['imagenLugar'], $entrenamiento->getFilename()) or
                    !$entrenamiento->setDireccionLugar($_POST['direccionLugar']) or
                    !$entrenamiento->setURLlugar($_POST['URLLugar'])
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->createRowLugares()) {
                    $result['status'] = 1;
                    $result['message'] = 'Lugar de entrenamiento creado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenLugar'], $entrenamiento::RUTA_IMAGEN, $entrenamiento->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el lugar';
                }
                break;
            case 'readAllLugares':
                if ($result['dataset'] = $entrenamiento->readAllLugares()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen lugares de entrenamiento registrados';
                }
                break;
            case 'readOneLugares':
                if ( !$entrenamiento->setIdLugar($_POST['idLugar'])) {
                    $result['error'] = 'Entrenamiento incorrecto';
                } elseif ($result['dataset'] = $entrenamiento->readOneLugares()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Lugar inexistente';
                }
                break;
            case 'updateRowLugares':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$entrenamiento->setIdLugar($_POST['idLugar']) or
                    !$entrenamiento->setFilename() or
                    !$entrenamiento->setNombreLugar($_POST['nombreLugar']) or
                    !$entrenamiento->setDireccionLugar($_POST['direccionLugar']) or
                    !$entrenamiento->setURLlugar($_POST['URLLugar']) or
                    !$entrenamiento->setImagenLugar($_FILES['imagenLugar'], $entrenamiento->getFilename())
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->updateRowLugares()) {
                    $result['status'] = 1;
                    $result['message'] = 'Campo del lugar modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenLugar'], $entrenamiento::RUTA_IMAGEN, $entrenamiento->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el lugar';
                }
                break;
            case 'deleteRowLugares':
                if (
                    !$entrenamiento->setIdLugar($_POST['idLugar']) or
                    !$entrenamiento->setFilename()
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->deleteRowLugares()) {
                    $result['status'] = 1;
                    $result['message'] = 'Lugar eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($entrenamiento::RUTA_IMAGEN, $entrenamiento->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este lugar';
                }
                break;



                //Sección de lugares y horarios, asignados

            case 'createRowLugaresHorarios':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$entrenamiento->setIdLugarr($_POST['selectDiaLugar']) or
                    !$entrenamiento->setIdHorarioo($_POST['selectHorarioLugar'])
                    
                ) {
                    $result['error'] = $entrenamiento->getDataError();
                } elseif ($entrenamiento->createRowLugaresHorarios()) {
                    $result['status'] = 1;
                    $result['message'] = 'Lugar y horario asigandos correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al asignar el entrenamiento y el horario';
                }
                break;

                case 'readAllLugaresHorarios':
                    if ($result['dataset'] = $entrenamiento->readAllLugaresHorarios()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen asignaciones de lugares y horarios registradas';
                    }
                    break;
                case 'readOneLugaresHorarios':
                    if (!$entrenamiento->setIdLugarHorario($_POST['idHorarioLugar'])) {
                        $result['error'] = $entrenamiento->getDataError();
                    } elseif ($result['dataset'] = $entrenamiento->readOneLugaresHorarios()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'Asignaciones inexistentes';
                    }
                    break;
                case 'updateRowLugaresHorarios':
                    $_POST = Validator::validateForm($_POST);
                    if (!$entrenamiento->setIdLugarHorario($_POST['idHorarioLugar']) or
                        !$entrenamiento->setIdLugarr($_POST['selectDiaLugar'])or
                        !$entrenamiento->setIdHorarioo($_POST['selectHorarioLugar'])
                    ) {
                        $result['error'] = $entrenamiento->getDataError();
                    } elseif ($entrenamiento->updateRowLugaresHorarios()) {
                        $result['status'] = 1;
                        $result['message'] = 'Asignación modificado correctamente';
                        
                    } else {
                        $result['error'] = 'Ocurrió un problema al modificar el nivel de usuario';
                    }
                    break;
                case 'deleteRowLugaresHorarios':
                    if (
                        !$entrenamiento->setIdLugarHorario($_POST['idHorarioLugar'])
                    ) {
                        $result['error'] = $entrenamiento->getDataError();
                    } elseif ($entrenamiento->deleteRowLugaresHorarios()) {
                        $result['status'] = 1;
                        $result['message'] = 'Asignación eliminada correctamente';
                        
                    } else {
                        $result['error'] = 'Ocurrió un problema al eliminar esta asignación';
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
