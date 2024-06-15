<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/detallemensualidad_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla CATEGORIA.
 */
class DetallePagosMensualidadData extends DetallesPagosMensualidadHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setIdDetalle($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->iddetalle = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del detalle del pago es incorrecto';
            return false;
        }
    }

    public function setIdPago($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->idpago = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del pago es incorrecto';
            return false;
        }
    }

    public function setDescripcion($value, $min = 2, $max = 50)
    {
        if (!Validator::validateString($value)) {
            $this->data_error = 'La descripción debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcionpago = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaProximoPago($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechaproximopago = $value;
            return true;
        } else {
            $this->data_error = 'La fecha es incorrecta';
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