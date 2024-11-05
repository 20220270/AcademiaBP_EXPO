<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/notificaciones_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class NotificacionesData extends NotificacionesHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idnotificacion = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la notificación es incorrecto';
            return false;
        }
    }

    public function setTitulo($value, $min = 2, $max = 40)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El título debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->titulo = $value;
            return true;
        } else {
            $this->data_error = 'El título debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setMensaje($value, $min = 2, $max = 200)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El título debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->mensjae = $value;
            return true;
        } else {
            $this->data_error = 'El mensaje debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setTipo($value, $min = 2, $max = 20)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El tipo de notificación debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->tipo = $value;
            return true;
        } else {
            $this->data_error = 'El tipo de notificación debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaEnvio($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de envío es incorrecta';
            return false;
        }
    }

    public function setEstado($value, $min = 2, $max = 15)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El estado debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setIdNivel($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idnivel = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del nivel de usuario es incorrecto';
            return false;
        }
    }

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
