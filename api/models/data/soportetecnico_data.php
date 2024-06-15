<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/soportetecnico_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class SoporteTecnicoData extends SoporteTecnicoHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdSoporte($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idsoporte = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del soporte es incorrecto';
            return false;
        }
    }

    public function setMensaje($value, $min = 2, $max = 2000)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El mensaje no debe contener caracteres especiales';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->mensaje = $value;
            return true;
        } else {
            $this->data_error = 'El mensaje debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaEnvio($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechanevio = $value;
            return true;
        } else {
            $this->data_error = 'Formato de fecha incorrecto';
            return false;
        }
    }
    
    public function setEstado($value, $min = 2, $max = 2000)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'El estado no debe contener caracteres especiales';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setIdCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idcliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto';
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