<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/alumnosclientes_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class AlumnoClientesData extends AlumnosClientesHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdAlumnoCliente($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idalumnocliente = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del dato es incorrecto';
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
    public function setIdAlumno($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idalumno = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del alumno es incorrecto';
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
}
