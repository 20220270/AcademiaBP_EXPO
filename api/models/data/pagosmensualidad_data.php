<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/pagosmensualidad_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de la tabla CLIENTE.
*/
class PagosMensualidadData extends PagosMensualidadHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;
    /*
    *   Métodos para validar y establecer los datos.
    */

    
    public function setIdPago($value) //id del pago
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idpago = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del pago es incorrecto';
            return false;
        }
    }

    public function setIdAlumnoCliente($value) //id de la relación entre clientes y alumnos
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idalumno = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del alumno es incorrecto';
            return false;
        }
    }

    public function setFechaPago($value)
    {
        if (Validator::validateDate($value)) {
            $this->fecha = $value;
            return true;
        } else {
            $this->data_error = 'Formato de fecha incorrecto';
            return false;
        }
    }

     
    public function setCuotasAnuales($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cuotasanuales = $value;
            return true;
        } else {
            $this->data_error = 'El formato de las cuotas del pago es incorrecto';
            return false;
        }
    }

    public function setCuotasPendientes($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->cuotaspendiente = $value;
            return true;
        } else {
            $this->data_error = 'El formato de las cuotas pendientes es incorrecto';
            return false;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateString($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->data_error = 'El estado es incorrecto';
            return false;
        }
    }

    public function setIdMetodo($value) //id del pedido
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idmetodopago = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del método de pago es incorrecto';
            return false;
        }
    }

    public function setInformacion($value)
    {
        if (Validator::validateString($value)) {
            $this->informacionmetodo = $value;
            return true;
        } else {
            $this->data_error = 'La información del método de pago es incorrecta';
            return false;
        }
    }



    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }

}